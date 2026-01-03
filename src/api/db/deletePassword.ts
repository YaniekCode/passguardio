"use server";

import openDb from "@/api/db/openDb";
import { ResultMessage } from "@/lib";

export default async function deletePassword(user_id: number, uuid: string): Promise<ResultMessage> {
	const db = await openDb();

	try {
		await db.run(
            		`DELETE FROM passwords WHERE uuid = ? AND user_id = ?`,
			uuid,
			user_id
        	);
		return { success: true, message: "Password deleted successfully" };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when deleting a password" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
