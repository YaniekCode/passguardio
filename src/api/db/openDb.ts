import Database from 'better-sqlite3';

export default function openDb() {
	const db = new Database('./src/api/db/mydb.db');
	return db;
};
