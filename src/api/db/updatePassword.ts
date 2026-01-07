/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2025 YaniekCode
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

"use server";

import openDb from "@/api/db/openDb";
import { PasswordDatabaseRecord, ResultMessage } from "@/lib";

export default async function updatePassword(passwordData: PasswordDatabaseRecord): Promise<ResultMessage>{
	const db = await openDb();

	try {
		await db.run(
            		`UPDATE passwords SET name=?, password=?, url=?, iv=?, tag=? WHERE uuid=?`,
			passwordData.name,
		       	passwordData.password,
			passwordData.url,
			passwordData.iv,
			passwordData.tag,
			passwordData.uuid
        	);
		return { success: true, message: "Password updated successfully" };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when updating a password" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
