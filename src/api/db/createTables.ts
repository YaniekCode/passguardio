import openDb from "@/api/db/openDb";

export default function createTables() {
	const db = openDb();

	const createUsersTable = db.prepare(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL,
			email TEXT NOT NULL UNIQUE,
			password_hash TEXT NOT NULL,
			role TEXT NOT NULL DEFAULT 'user'
		)`);
	createUsersTable.run();

	const createPasswordsTable = db.prepare(`
		CREATE TABLE IF NOT EXISTS passwords (
			user_id INTEGER PRIMARY KEY REFERENCES users(id),
			uuid BLOB UNIQUE NOT NULL,
			name TEXT,
			password TEXT,
			url TEXT,
			salt BLOB NOT NULL,
			iv BLOB NOT NULL
		)`);
	createPasswordsTable.run();
};
