"use server";

import { UserDatabaseInsert, ResultMessage } from "@/lib";
import openDb from "@/api/db/openDb";

export default async function createUser(userData: UserDatabaseInsert): Promise<ResultMessage> {
	const db = await openDb();

	try {
		await db.run(
      			"INSERT INTO users (username, email, password_hash, role, encryption_salt, wrapped_dek, dek_wrap_iv, dek_wrap_tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
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

		if (err instanceof Error && err.message.toUpperCase().includes("UNIQUE")) {
			return { success: false, error: "This user already exists" };
		}

		console.log(err);
		return { success: false, error: "An error occurred when creating a user" };

	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
}

