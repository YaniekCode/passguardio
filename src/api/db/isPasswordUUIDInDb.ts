"use server";

import openDb from "@/api/db/openDb";
import { ResultMessage } from "@/lib";

export default async function isPasswordUUIDInDb(userId: number, uuid: string): Promise<ResultMessage> {
	const db = await openDb();

	try {
		const passwordEntry = (await db.get(
			`SELECT uuid FROM passwords WHERE uuid=? AND user_id=?`,
			uuid,
			userId
		)) as { uuid: string } | undefined;
		if (passwordEntry?.uuid) {
			return { success: true, message: "Password found in DB" };
		} else {
			return { success: false, error: "Password not found in DB" };
		};
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occured when validating the password" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		};
	};
};
