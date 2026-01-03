"use server";

import openDb from "@/api/db/openDb";
import { PasswordDatabaseRecord, PasswordDatabaseResult } from "@/lib";

export default async function getPasswords(userId: number): Promise<PasswordDatabaseResult> {
	const db = await openDb();

	try {
		const passwordList = (await db.all(
            		`SELECT * FROM passwords WHERE user_id=?`,
			userId
        	)) as PasswordDatabaseRecord[];

		return { success: true, data: passwordList };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when reading passwords" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};
