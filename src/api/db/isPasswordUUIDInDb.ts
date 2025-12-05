"use server";

import openDb from "@/api/db/openDb";

export default async function isPasswordUUIDInDb(userId: number, uuid: string) {
	const db = openDb();

	try {
		const query = db.prepare(
			`SELECT uuid FROM passwords WHERE uuid=? AND user_id=?`
		);
		const passwordEntry = query.get(uuid, userId) as { uuid: string } | undefined;

		if (passwordEntry && passwordEntry.uuid) {
			return { success: true, message: "Password found in DB" };
		} else {
			return { success: false, error: "Password not found in DB" };
		};

	} catch (err: unknown) {
		console.log(err);

		return { success: false, error: "An error occured when validating the password" };
	
	} finally {
		try {
			db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		};
	};
};
