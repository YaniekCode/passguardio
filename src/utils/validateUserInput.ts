import { z } from "zod";
import { fromError } from "zod-validation-error";
import { UserInterface, LoginUserInterface, ValidationResult } from "@/lib";

export default function ValidateUserInput(UserData: UserInterface | LoginUserInterface) {
	const usernameField = z.string()
			.min(3, "Username must be at least 3 characters long.")
			.max(50, "Username cannot be longer than 50 characters.")
			.regex(/^[\p{L}0-9_\- ]+$/u, "Username can contain only letters, numbers, underscores, hyphens and spaces");
	const emailField = z.email();
	const passwordField = z.string()
			.min(8, "Password must be at least 8 characters long.")
			.max(100, "Username cannot be longer than 100 characters.")
			.refine((val) => !/\s/.test(val), "Password cannot contain whitespace characters (e.g., space, tab).");
	const roleField = z.enum(["user", "admin"]);


	const SignupSchema = z.object({
		username: usernameField,
		email: emailField,
		password: passwordField,
		role: roleField,
	});

	const LoginSchema = z.object({
		email: emailField,
		password: passwordField,
	});

	let result;
	if ("username" in UserData) {
		result = SignupSchema.safeParse(UserData);
	} else {
		result = LoginSchema.safeParse(UserData);

	};
	
	if (result.success) {
		const validationError: ValidationResult = { success: true, data: result.data };
		return validationError;

	} else {
		const errorMessage = fromError(result.error).details[0].message;
		const validationError: ValidationResult = { success: false, error: errorMessage };
		return validationError;
	};

}
