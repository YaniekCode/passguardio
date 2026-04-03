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

type IsPasswordInDBResult = 
	{ success: true, message: string, found: boolean }
	| { success: false, error: string }

export default async function isPasswordUUIDInDb(userId: number, uuid: string): Promise<IsPasswordInDBResult> {
	const db = await openDb();

	try {
		const passwordEntry = (await db.get(
			`SELECT uuid FROM passwords WHERE uuid=? AND userId=?`,
			uuid,
			userId
		)) as { uuid: string } | undefined;

		// Return `success: true`, but `data` indicates whether the password was found
		return {
			success: true,
			message: passwordEntry?.uuid ? "Password found in DB" : "Password not found in DB",
			found: Boolean(passwordEntry?.uuid)
		}
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occured when validating the password" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		};
	};
};
