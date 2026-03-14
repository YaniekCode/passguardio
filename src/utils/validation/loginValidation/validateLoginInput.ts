import { fromError } from "zod-validation-error";

import {  LoginUserInterface,  LoginValidationResultType} from "@/types";
import {  LoginSchema } from "@/utils/validation/userSchemas";

export function validateLoginInput(userData: LoginUserInterface): LoginValidationResultType {
	const result = LoginSchema.safeParse(userData);

	if (result.success) {
		const validationResult: LoginValidationResultType = { success: true, data: result.data };
		return validationResult;
	} else {
		const errorMessage = fromError(result.error).details[0].message;
		const validationError: LoginValidationResultType= { success: false, error: errorMessage};
		return validationError;
	}
}
