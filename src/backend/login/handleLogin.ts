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

import type { LoginResultType, UserLoginCredentials } from '@/types/login';
import { SessionPayload } from '@/types';
import { createTables } from '@/backend/db/createTables';
import deriveKEK from '@/utils/encryption/deriveKEK';
import unwrapDEK from '@/utils/encryption/unwrapDEK';
import { authenticateUser } from '@/backend/db/authenticateUser';

export async function handleLogin(userData: UserLoginCredentials): Promise<LoginResultType> {
	// Create default tables in the DB unless they already exist
	await createTables();

	// Verify the correctness of the user's credentials
	const userLoginResult  = await authenticateUser(userData);

	if (!userLoginResult.success) {
		return {
			success: false,
			error: userLoginResult.error
		}
	}

	const user = userLoginResult.data;
	const kek = deriveKEK(userData.password, user.encryptionSalt);
	const dek = unwrapDEK(user.wrappedDek, user.dekWrapIv, user.dekWrapTag, kek).toString("hex");

	const userSessionData: SessionPayload = { id: user.id, username: user.username, role: user.role, dek: dek }
	return { success: true, data: userSessionData };

};
