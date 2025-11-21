"use server";

import { LoginUserInterface, FormState } from "@/lib";
import ValidateUserInput from "@/utils/validateUserInput";
import handleLogin from "@/api/login/handleLogin";
import { setSession } from "@/utils/session/sessionUtils";
import { redirect } from "next/navigation";

export default async function login(prevState: FormState, formData: FormData): Promise<FormState> {

	const rawFormData: LoginUserInterface = {
		email: formData.get('email')?.toString() || "",
		password: formData.get('password')?.toString() || "",
	};

	const validation = ValidateUserInput(rawFormData);

	if (!validation.success) {
		return validation;
	};

	const userData = validation.data;
	const loginResult = await handleLogin(userData); // function responsible for checking the user in db


	if (!loginResult.success) {
		return loginResult;
	} else {
		const { password_hash, ...sessionData } = loginResult.data;
		await setSession(sessionData);
		redirect("/dashboard");
		return loginResult;
	};
       
	
};
