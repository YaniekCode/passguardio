"use server";

import openDb from "@/api/db/openDb";
import { PasswordDatabaseRecord } from "@/lib";

export default async function updatePassword(passwordData: PasswordDatabaseRecord) {
	const db = openDb();

	try {

		const query = db.prepare(
            		`UPDATE passwords SET name=?, password=?, url=?, iv=?, tag=? WHERE uuid=?`
        	);
		query.run(passwordData.name, passwordData.password, passwordData.url, passwordData.iv, passwordData.tag, passwordData.uuid);

		return { success: true, message: "Password updated successfully" };

	} catch (err: unknown) {
		console.log(err);

		return { success: false, error: "An error occurred when updating a password" };

	} finally {
		try {
			db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
