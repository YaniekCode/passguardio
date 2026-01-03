"use server";

import { UserDatabaseRecord, LoginUserInterface, HandleLogin } from "@/lib";
import compareHash from "@/utils/compareHash";
import openDb from "@/api/db/openDb";

export default async function loginUser(userData: LoginUserInterface): Promise<HandleLogin>{
	const db = await openDb();

	try {
		const user = (await db.get(
			"SELECT * FROM users WHERE email = ?",
			userData.email
		)) as UserDatabaseRecord | undefined;
		if (!user) {
			return { success: false, error: "Invalid email or password" };
		};

		const isEqual = compareHash(userData.password, user.password_hash);
		if (isEqual) {
			return { success: true, data: user };
		} else {
			return { success: false, error: "Invalid email or password "};
		};
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when logging in" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
