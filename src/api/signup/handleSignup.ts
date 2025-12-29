"use server";

import { UserInterface, UserDatabaseInsert, ResultMessage } from "@/lib";
import createTables from "@/api/db/createTables";
import createUser from "@/api/db/createUser";
import generateHash from "@/utils/generateHash";
import generateEncryptionCredentials from "@/utils/encryption/generateEncryptionCredentials";

export default async function handleSignup(userData: UserInterface): Promise<ResultMessage> {
	createTables(); // create default tables in sqlite db

	const passwordHash = generateHash(userData.password);
	const userEncryptionData = generateEncryptionCredentials(userData.password);
	const user: UserDatabaseInsert = { ...userData, password_hash: passwordHash, ...userEncryptionData};

	const dbResult = await createUser(user);
	if (dbResult.success) {
		return { success: true, message: "User created successfully" };
	} else {
		console.log(`An error occured when creating a user. Error: ${dbResult.error}`);
		return { success: false, error: dbResult.error };
	};

};


