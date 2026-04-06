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

import type { MessageResultType } from "@/types";
import { openDb } from "@/backend/db/openDb";

export async function deleteToken(token: string): Promise<MessageResultType> {
	const db = await openDb();

	try {
		await db.run(`DELETE FROM tokens WHERE token=?`, token);

		return { success: true, message: "Token deleted successfully" };
	} catch (err: unknown) {
		console.log(err);
		return {
			success: false,
			error: "An error occurred when deleting the token",
		};
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
