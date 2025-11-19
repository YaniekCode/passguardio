"use server";

import { UserDatabaseRecord, LoginUserInterface, ResultMessage } from "@/lib";
import compareHash from "@/utils/compareHash";
import openDb from "@/api/db/openDb";

export default async function loginUser(userData: LoginUserInterface): Promise<ResultMessage> {
	const db = openDb();

	try {
		const query = db.prepare(
      			"SELECT id, username, email, password_hash, role FROM users WHERE email=?"
		);

		const user = query.get(
			userData.email,
		) as UserDatabaseRecord | undefined;

		if (!user) {
			return { success: false, error: "Invalid email or password" };
		};

		const isEqual = compareHash(userData.password, user.password_hash);

		if (isEqual) {
			return { success: true, message: "User logged in successfully" };
		} else {
			return { success: false, error: "Invalid email or password "};
		};

	} catch (err: unknown) {
		console.log(err);

		return { success: false, error: "An error occurred when logging in" };

	} finally {
		try {
			db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}
