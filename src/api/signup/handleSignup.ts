"use server";

import { UserInterface, ResultMessage } from "@/lib";
import createTables from "@/api/db/createTables";
import createUser from "@/api/db/createUser";
import generateHash from "@/utils/generateHash";

export default async function handleSignup(userData: UserInterface): Promise<ResultMessage> {
	createTables(); // create default tables in sqlite db

	const passwordHash = await generateHash(userData.password);
	const user = { ...userData, password: passwordHash };

	const dbResult = await createUser(user);
	if (dbResult.success) {
		return { success: true, message: "User created successfully" };
	} else {
		return { success: false, error: dbResult.error };
	};

};


