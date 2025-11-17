"use server";

import { UserInterface, ResultMessage } from "@/lib";
import openDb from "@/api/db/openDb";

export default async function createUser(userData: UserInterface): Promise<ResultMessage> {
	const db = openDb();

	try {
		const query = db.prepare(
      			"INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)"
		);

		query.run(
			userData.username,
			userData.email,
			userData.password,
			userData.role
		);

		return { success: true, message: "User created successfully" };

	} catch (err: unknown) {

		if (err instanceof Error && err.message.includes("UNIQUE")) {
			return { success: false, error: "This user already exists" };
		}

		return { success: false, error: "An error occurred when creating a user" };

	} finally {
		try {
			db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}

