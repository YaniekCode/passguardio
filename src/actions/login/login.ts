"use server";
import { redirect } from "next/navigation";

import { LoginUserInterface, FormState } from "@/lib";
import { validateLoginInput } from "@/utils/validation/validateUserInput";
import handleLogin from "@/api/login/handleLogin";
import { setSession } from "@/utils/session/sessionUtils";

export default async function login(prevState: FormState, formData: FormData): Promise<FormState> {
	const rawFormData: LoginUserInterface = {
		email: formData.get('email')?.toString() || "",
		password: formData.get('password')?.toString() || "",
	};

	const validation = validateLoginInput(rawFormData);
	if (!validation.success) {
		return validation;
	};

	const userData = validation.data;
	const loginResult = await handleLogin(userData); // function responsible for checking the user in db

	if (!loginResult.success) {
		return loginResult;
	} else {
		const userSessionData = loginResult.data;
		await setSession(userSessionData);
		redirect("/dashboard"); // redirecting to dashboard
		//return loginResult;
	};
};
