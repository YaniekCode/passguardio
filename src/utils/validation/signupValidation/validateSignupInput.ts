import { fromError } from "zod-validation-error";

import { UserType, SignupValidationResultType } from "@/lib";
import { SignupSchema } from "@/utils/validation/userSchemas";

export function validateSignupInput(userData: UserType): SignupValidationResultType {
	const result = SignupSchema.safeParse(userData);

	if (result.success) {
		const validationResult: SignupValidationResultType = { success: true, data: result.data };
		return validationResult;
	} else {
		const errorMessage = fromError(result.error).details[0].message;
		const validationError: SignupValidationResultType = { success: false, error: errorMessage};
		return validationError;
	}
}
