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

export async function createTables(): Promise<void> {
	const db = await openDb();

	// Create the table for users
	await db.run(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			passwordHash TEXT NOT NULL,
			role TEXT NOT NULL DEFAULT 'user',
			encryptionSalt BLOB,
			wrappedDek BLOB,
			dekWrapIv BLOB,
			dekWrapTag BLOB
	)`);

	// Create the table for passwords
	await db.run(`
		CREATE TABLE IF NOT EXISTS passwords (
			userId INTEGER REFERENCES users(id),
			uuid BLOB UNIQUE NOT NULL,
			websiteName TEXT,
			websiteUrl TEXT,
			usernameOrEmail TEXT,
			password TEXT,
			category TEXT,
			strength INTEGER,
			lastModified TEXT,
			createdAt TEXT,
			crackTime TEXT,
			iv BLOB NOT NULL,
			tag BLOB NOT NULL
	)`);

	// Create the table for tokens
	await db.run(`
		CREATE TABLE IF NOT EXISTS tokens (
			role TEXT,
			token TEXT,
			expiresAt INTEGER
	)`);
};
