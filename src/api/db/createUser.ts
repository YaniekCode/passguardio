"use server";

import { UserDatabaseRecord, ResultMessage } from "@/lib";
import openDb from "@/api/db/openDb";

export default async function createUser(userData: UserDatabaseRecord): Promise<ResultMessage> {
	const db = openDb();

	try {
		const query = db.prepare(
      			"INSERT INTO users (username, email, password_hash, role, encryption_salt, wrapped_dek, dek_wrap_iv, dek_wrap_tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
		);

		query.run(
			userData.username,
			userData.email,
			userData.password_hash,
			userData.role,
			userData.encryption_salt,
			userData.wrapped_dek,
			userData.dek_wrap_iv,
			userData.dek_wrap_tag
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

