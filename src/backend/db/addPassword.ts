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

import { openDb } from '@/backend/db/openDb';
import type { PasswordDatabaseRecordType, MessageResultType } from '@/types';

export default async function addPassword(passwordDatabaseInputRecord: PasswordDatabaseRecordType): Promise<MessageResultType> {
	const db = await openDb();

	try {
		await db.run(
            		`INSERT INTO passwords (userId, uuid, websiteName, websiteUrl, usernameOrEmail, password, category, strength, lastModified, createdAt, crackTime, iv, tag)
             		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			passwordDatabaseInputRecord.userId,
			passwordDatabaseInputRecord.uuid,
			passwordDatabaseInputRecord.websiteName,
			passwordDatabaseInputRecord.websiteUrl,
			passwordDatabaseInputRecord.usernameOrEmail,
			passwordDatabaseInputRecord.password,
			passwordDatabaseInputRecord.category,
			passwordDatabaseInputRecord.strength,
			passwordDatabaseInputRecord.lastModified,
			passwordDatabaseInputRecord.createdAt,
			passwordDatabaseInputRecord.crackTime,
			passwordDatabaseInputRecord.iv,
			passwordDatabaseInputRecord.tag,
        	);

		return { success: true, message: "Password added successfully" };

	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when adding a password" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
