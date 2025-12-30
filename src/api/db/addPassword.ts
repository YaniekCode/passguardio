"use server";

import openDb from "@/api/db/openDb";
import { PasswordDatabaseRecord, ResultMessage } from "@/lib";

export default async function addPassword(passwordDatabaseInput: PasswordDatabaseRecord): Promise<ResultMessage> {
	const db = await openDb();

	try {

		await db.run(
            		`INSERT INTO passwords (user_id, uuid, name, password, url, iv, tag)
             		VALUES (?, ?, ?, ?, ?, ?, ?)`,
			passwordDatabaseInput.user_id,
			passwordDatabaseInput.uuid,
			passwordDatabaseInput.name,
			passwordDatabaseInput.password,
			passwordDatabaseInput.url,
			passwordDatabaseInput.iv,
			passwordDatabaseInput.tag,
        	);

		return { success: true, message: "Password added successfully" };

	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when adding a password" };

	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
