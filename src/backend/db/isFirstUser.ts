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
import type { Result } from '@/types';

export async function isFirstUser(): Promise<Result<boolean>> {
	const db = await openDb();

	try {
		const row = await db.get<{ count: number }>(
			`SELECT COUNT(*) as count FROM users`
		);
		const count = row?.count ?? 0;

		return { success: true, data: count === 0 };
	} catch (err: unknown) {
		console.log("An error occured when counting number of records in DB: ", err);
		return { success: false, error: "An error occured when counting the number of records in DB" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	};

};
