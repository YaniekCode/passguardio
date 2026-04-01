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

import type { UserDatabaseRecordType, MessageResultType } from '@/types';
import openDb from '@/backend/db/openDb';

type Props = Omit<UserDatabaseRecordType, "id">;

export default async function createUser(userData: Props): Promise<MessageResultType> {
	const db = await openDb();

	try {
		await db.run(
      			"INSERT INTO users (username, email, password_hash, role, encryption_salt, wrapped_dek, dek_wrap_iv, dek_wrap_tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			userData.username,
			userData.email,
			userData.password_hash,
			userData.role,
			userData.encryption_salt,
			userData.wrapped_dek,
			userData.dek_wrap_iv,
			userData.dek_wrap_tag
		);
		return { success: true, message: "User created successfully" };
	} catch (err: unknown) {
		console.log(err);
		if (err instanceof Error && err.message.toUpperCase().includes("UNIQUE")) {
			return { success: false, error: "This user already exists" };
		}
		return { success: false, error: "An error occurred when creating a user" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}

