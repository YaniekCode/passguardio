import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

sqlite3.verbose();

export default async function openDb(): Promise<Database> {
  const db = await open({
    filename: './src/api/db/mydb.db',
    driver: sqlite3.Database,
  });

  return db;
}

