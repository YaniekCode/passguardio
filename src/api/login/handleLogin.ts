"use server";

import { LoginUserInterface, LoginResult, SessionPayload } from "@/lib";
import createTables from "@/api/db/createTables";
import deriveKEK from "@/utils/encryption/deriveKEK";
import unwrapDEK from "@/utils/encryption/unwrapDEK";
import loginUser from "@/api/db/loginUser";

export default async function handleLogin(userData: LoginUserInterface): Promise<LoginResult> {
	await createTables(); // create default tables in sqlite db
	const dbLoginUserResult= await loginUser(userData);
	if (dbLoginUserResult.success) { // User found and password is correct
		const user = dbLoginUserResult.data;
		const kek = deriveKEK(userData.password, user.encryption_salt);
		const dek = unwrapDEK(user.wrapped_dek, user.dek_wrap_iv, user.dek_wrap_tag, kek).toString("hex");

		const userSessionData: SessionPayload = { id: user.id, username: user.username, role: user.role, dek: dek }
		return { success: true, data: userSessionData };
	} else {
		return { success: false, error: dbLoginUserResult.error };
	};

};
