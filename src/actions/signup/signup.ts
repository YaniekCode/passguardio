"use server";
import { redirect } from "next/navigation";

import { UserInterface, FormState } from "@/lib";
import { validateSignupInput } from "@/utils/validation/validateUserInput";
import handleSignup from "@/api/signup/handleSignup";

export default async function signup(prevState: FormState, formData: FormData): Promise<FormState> {
	const rawFormData: UserInterface = {
		username: formData.get('username')?.toString() || "",
		email: formData.get('email')?.toString() || "",
		password: formData.get('password')?.toString() || "",
		role: "admin", // when a user signs up they automatically become an admin
	};

	const validation = validateSignupInput(rawFormData);
	if (!validation.success) {
		return validation;
	};

	const userData = validation.data;
	const signupResult = await handleSignup(userData);
	
	if (!signupResult.success) {
		return signupResult;
	} else {
		redirect("/"); // reditecting to login page
		//return signupResult;
	};
	
};
