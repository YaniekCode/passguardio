"use server";

import { LoginUserInterface, FormState } from "@/lib";
import ValidateUserInput from "@/utils/validateUserInput";
import handleLogin from "@/api/login/handleLogin";
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
	const loginResult = await handleLogin(userData);

	console.log(loginResult);
	
	if (!loginResult.success) {
		return loginResult;
	} else {
		redirect("/dashboard");
		return loginResult;
	};
       
	
};
