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

"use server";

import openDb from "@/api/db/openDb";

export default async function createTables(): Promise<void> {
	const db = await openDb();

	await db.run(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			password_hash TEXT NOT NULL,
			role TEXT NOT NULL DEFAULT 'user',
			encryption_salt BLOB,
			wrapped_dek BLOB,
			dek_wrap_iv BLOB,
			dek_wrap_tag BLOB
	)`);

	await db.run(`
		CREATE TABLE IF NOT EXISTS passwords (
			user_id INTEGER REFERENCES users(id),
			uuid BLOB UNIQUE NOT NULL,
			website_name TEXT,
			website_url TEXT,
			username_or_email TEXT,
			password TEXT,
			category TEXT,
			strength INTEGER,
			last_modified TEXT,
			created_at TEXT,
			crack_time TEXT,
			iv BLOB NOT NULL,
			tag BLOB NOT NULL
	)`);
};
