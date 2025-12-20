"use server";

import { UserInterface, FormState } from "@/lib";
import ValidateUserInput from "@/utils/validateUserInput";
import handleSignup from "@/api/signup/handleSignup";
import { redirect } from "next/navigation";

export default async function signup(prevState: FormState, formData: FormData): Promise<FormState> {

	const rawFormData: UserInterface = {
		username: formData.get('username')?.toString() || "",
		email: formData.get('email')?.toString() || "",
		password: formData.get('password')?.toString() || "",
		role: "admin", // when a user signs up they automatically became an admin
	};

	const validation = ValidateUserInput(rawFormData);

	if (!validation.success) {
		return validation;
	};

	const userData = validation.data;
	const signupResult = await handleSignup(userData);
	
	if (!signupResult.success) {
		return signupResult;
	} else {
		redirect("/");
		return signupResult;
	};
	
};
