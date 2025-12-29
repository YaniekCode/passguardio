import { fromError } from "zod-validation-error";
import { UserInterface, LoginUserInterface, SignupValidationResult, LoginValidationResult } from "@/lib";
import { SignupSchema, LoginSchema} from "@/utils/validation/userSchemas";

export function validateSignupInput(userData: UserInterface): SignupValidationResult {
	const result = SignupSchema.safeParse(userData);

	if (result.success) {
		const validationResult: SignupValidationResult = { success: true, data: result.data };
		return validationResult;
	} else {
		const errorMessage = fromError(result.error).details[0].message;
		const validationError: SignupValidationResult = { success: false, error: errorMessage};
		return validationError;
	}
}

export function validateLoginInput(userData: LoginUserInterface): LoginValidationResult {
	const result = LoginSchema.safeParse(userData);

	if (result.success) {
		const validationResult: LoginValidationResult = { success: true, data: result.data };
		return validationResult;
	} else {
		const errorMessage = fromError(result.error).details[0].message;
		const validationError: LoginValidationResult = { success: false, error: errorMessage};
		return validationError;
	}
}