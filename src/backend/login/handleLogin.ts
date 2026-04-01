/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2026 YaniekCode
 *
 * This file is part of PassGuardio.
 *
 * PassGuardio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PassGuardio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PassGuardio.  If not, see <https://www.gnu.org/licenses/>.
*/

'use server';

import type { LoginResultType } from '@/types/login';
import { LoginUserInterface, SessionPayload } from '@/types';
import createTables from '@/backend/db/createTables';
import deriveKEK from '@/utils/encryption/deriveKEK';
import unwrapDEK from '@/utils/encryption/unwrapDEK';
import loginUser from '@/backend/db/loginUser';

export async function handleLogin(userData: LoginUserInterface): Promise<LoginResultType> {
	await createTables(); // create default tables in sqlite db
	const dbLoginUserResult= await loginUser(userData);
	if (dbLoginUserResult.success) { // User found and password is correct
		const user = dbLoginUserResult.data;
		const kek = deriveKEK(userData.password, user.encryption_salt);
		const dek = unwrapDEK(user.wrapped_dek, user.dek_wrap_iv, user.dek_wrap_tag, kek).toString("hex");

		const userSessionData: SessionPayload = { id: user.id, username: user.username, role: user.role, dek: dek }
		return { success: true, data: userSessionData };
	} else {
		return { success: false, error: dbLoginUserResult.error };
	};

};
