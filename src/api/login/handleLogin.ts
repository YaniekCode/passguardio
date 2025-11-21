"use server";

import { LoginUserInterface, LoginResult } from "@/lib";
import loginUser from "@/api/db/loginUser";

export default async function handleLogin(userData: LoginUserInterface): Promise<LoginResult> {
	const dbResult = await loginUser(userData);
	if (dbResult.success) {
		return { success: true, data: dbResult.data };
	} else {
		return { success: false, error: dbResult.error };
	};

};
