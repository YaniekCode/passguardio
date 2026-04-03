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

import type { Result, UsersStatsType } from '@/types';
import { openDb } from '@/backend/db/openDb';

export async function fetchUserStats(): Promise<Result<UsersStatsType>> {
	const db = await openDb();

	try {
        /*
        Select the number of users, number of passwords, number of strong
        passwords(strength > 3) and number of weak passwords(strength <= 3)
        */
		const userStatList = (await db.get(
            		`SELECT 
                        (SELECT COUNT(*) FROM users) AS totalUsersCount,
                        COUNT(*) AS totalPasswordsCount,
                        COALESCE(SUM(CASE WHEN strength > 3 THEN 1 ELSE 0 END), 0) AS strongPasswordsCount,
                        COALESCE(SUM(CASE WHEN strength <= 3 THEN 1 ELSE 0 END), 0) AS weakPasswordsCount
                    FROM passwords;`,
        	)) as UsersStatsType;

		return { success: true, data: userStatList };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when reading user stats" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};