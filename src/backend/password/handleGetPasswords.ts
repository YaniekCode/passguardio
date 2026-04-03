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

import type { Result, PasswordData } from '@/types';
import { getSession } from "@/utils/session/sessionUtils";
import { getPasswords } from "@/backend/db/getPasswords";
import decryptUserPasswords from "@/utils/encryption/decryptUserPasswords";

export async function handleGetPasswords(query: string, currentPage: number): Promise<Result<PasswordData[]>>{
	const session = await getSession();
	if (!session) {
		return {
			success: false,
			error: "User not authenticated"
		};
	};

	const { dek } = session;
	// Fetch passwords from the DB
	const getPasswordResult = await getPasswords(session.id, query, currentPage);

	if (!getPasswordResult.success) {
		return {
			success: false,
			error: "An error occured when reading passwords"
		}
	};

	const passwordList = getPasswordResult.data;

	// Decrypt user's passwords
	const userPasswords = await decryptUserPasswords(passwordList, dek);

	return { success: true, data: userPasswords };
};
