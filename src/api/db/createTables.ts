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
			name TEXT,
			password TEXT,
			url TEXT,
			iv BLOB NOT NULL,
			tag BLOB NOT NULL
	)`);
};
