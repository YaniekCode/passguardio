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

import type { UserDatabaseRecordType, Result } from '@/types';
import type { UserLoginCredentials } from '@/types/login';
import { compareHash } from '@/utils/hashing/compareHash';
import openDb from '@/backend/db/openDb';

export async function authenticateUser(userData: UserLoginCredentials): Promise<Result<UserDatabaseRecordType>>{
	const db = await openDb();

	try {
		const user = (await db.get(
			"SELECT * FROM users WHERE email = ?",
			userData.email
		)) as UserDatabaseRecordType | undefined;
		if (!user) {
			return { success: false, error: "Invalid email or password" };
		};

		const isEqual = compareHash(userData.password, user.password_hash);
		if (isEqual) {
			return { success: true, data: user };
		} else {
			return { success: false, error: "Invalid email or password "};
		};
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when logging in" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
