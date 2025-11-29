"use server";

import openDb from "@/api/db/openDb";
import { PasswordDatabaseRecord, ResultMessage } from "@/lib";

export default async function addPassword(passwordDatabaseInput: PasswordDatabaseRecord): Promise<ResultMessage> {
	const db = openDb();

	try {

		const query = db.prepare(
            		`INSERT INTO passwords (user_id, uuid, name, password, url, iv, tag)
             		VALUES (@user_id, @uuid, @name, @password, @url, @iv, @tag)`
        	);
		query.run({ ...passwordDatabaseInput});

		return { success: true, message: "Password added successfully" };

	} catch (err: unknown) {
		console.log(err);

		return { success: false, error: "An error occurred when adding a password" };

	} finally {
		try {
			db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
