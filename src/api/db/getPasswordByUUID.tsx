"use server";

import openDb from "@/api/db/openDb";
import decryptUserPasswords from "@/utils/decryptUserPasswords";
import { getSession } from "@/utils/session/sessionUtils";
import { PasswordDatabaseRecord } from "@/lib";

export default async function getPasswordByUUID(uuid: string) {
	const db = await openDb();

	try {

		const passwordEntry = (await db.get(
			`SELECT * FROM passwords WHERE uuid = ?`,
			uuid
		)) as PasswordDatabaseRecord | undefined;

		if (!passwordEntry) {
			return { success: false, error: "Password not found" };
		};

		const session = await getSession();
		const { dek } = session;

		const decryptedPassword = await decryptUserPasswords(passwordEntry, dek);

		return { success: true, data: decryptedPassword };

	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when reading password" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};
