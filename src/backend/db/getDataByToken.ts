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

import type { ActivateTokenState } from "@/types/activate";
import { openDb } from "@/backend/db/openDb";

export async function getDataByToken(token: string): Promise<ActivateTokenState> {
	const db = await openDb();

	try {
		const row = await db.get(
			`SELECT role, token, expiresAt
            FROM tokens
            WHERE token = ? 
            `,
			token,
		);

		if (row) {
			return { success: true, data: row };
		} else {
			return { success: false, notFound: true, error: "Token not found" };
		}
	} catch (err: unknown) {
		console.log(err);
		return {
			success: false,
			notFound: false,
			error: "An error occurred when reading token data",
		};
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
