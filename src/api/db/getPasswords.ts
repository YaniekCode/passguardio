"use server";

import openDb from "@/api/db/openDb";
import { PasswordDatabaseRecord, PasswordDatabaseResult } from "@/lib";

export default async function getPasswords(userId: number): Promise<PasswordDatabaseResult> {
	const db = openDb();

	try {

		const query = db.prepare(
            		`SELECT * FROM passwords WHERE user_id=?`	
        	);
		const passwordList = query.all(userId) as PasswordDatabaseRecord[];
		console.log(passwordList);

		return { success: true, data: passwordList };

	} catch (err: unknown) {
		console.log(err);

		return { success: false, error: "An error occurred when reading passwords" };

	} finally {
		try {
			db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};
