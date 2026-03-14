import { ActivateUserFieldErrors, ActivateUserValidationResult } from "@/types/activate";
import { NewUserSchema } from "@/utils/validation/userSchemas";

export function validateNewUserInput(formData: FormData): ActivateUserValidationResult {
	const validatedFormData = NewUserSchema.safeParse({
		username: formData.get("username")?.toString() || "",
		email: formData.get("email")?.toString() || "",
		password: formData.get("password")?.toString() || "",
	});

	if (validatedFormData.success) {
		return {
			success: true,
			data: validatedFormData.data
		};
	}

	const flattened = validatedFormData.error.flatten();

	const formErrors: ActivateUserFieldErrors = {
		username: flattened.fieldErrors.username?.[0],
		email: flattened.fieldErrors.email?.[0],
		password: flattened.fieldErrors.password?.[0],
	}

	return {
		success: false,
		formErrors: formErrors,
		error: "Validation failed",
	};
}