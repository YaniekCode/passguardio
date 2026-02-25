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

import openDb from "@/backend/db/openDb";
import { MessageResultType } from "@/types";

export default async function deletePassword(user_id: number, uuid: string): Promise<MessageResultType> {
	const db = await openDb();

	try {
		await db.run(
            		`DELETE FROM passwords WHERE uuid = ? AND user_id = ?`,
			uuid,
			user_id
        	);
		return { success: true, message: "Password deleted successfully" };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when deleting a password" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
