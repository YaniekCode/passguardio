"use server";

import { LoginUserInterface, ResultMessage } from "@/lib";
import loginUser from "@/api/db/loginUser";

export default async function handleLogin(userData: LoginUserInterface): Promise<ResultMessage> {
	const dbResult = await loginUser(userData);
	if (dbResult.success) {
		return { success: true, message: "User logged in successfully" };
	} else {
		return { success: false, error: dbResult.error };
	};

};
