import path from 'node:path';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

sqlite3.verbose();

export default async function openDb(): Promise<Database> {
	const dbPath = path.join('./data', 'mydb.db');

  	const db = await open({
    		filename: dbPath,
    		driver: sqlite3.Database,
  	});
  	return db;
}

