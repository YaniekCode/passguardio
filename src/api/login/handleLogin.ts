"use server";

import { LoginUserInterface, LoginResult, SessionData } from "@/lib";
import deriveKEK from "@/utils/encryption/deriveKEK";
import unwrapDEK from "@/utils/encryption/unwrapDEK";
import loginUser from "@/api/db/loginUser";

export default async function handleLogin(userData: LoginUserInterface): Promise<LoginResult> {
	const dbResult = await loginUser(userData);
	if (dbResult.success) { // User found and password is correct
		const user = dbResult.data;
		const kek = deriveKEK(userData.password, user.encryption_salt);
		const dek = unwrapDEK(user.wrapped_dek, user.dek_wrap_iv, user.dek_wrap_tag, kek).toString("hex");

		const userSessionData: SessionData = { id: user.id, username: user.username, email: user.email, role: user.role, dek: dek }
		return { success: true, data: userSessionData };
	} else {
		return { success: false, error: dbResult.error };
	};

};
