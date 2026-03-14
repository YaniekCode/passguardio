import { z } from 'zod';

const FormSchema = z.object({
	role: z.enum(["user", "admin"], "Unknown role"), 
});


export type FormState =
	| { success: true, data: { role: "user" | "admin" }}
	| { success: false, errors: { role?: string[] }};

export function validateAddUserInput(formData: FormData): FormState {
	const validatedFormData = FormSchema.safeParse({
		role: formData.get("role")?.toString() || "",
	});

	if (!validatedFormData.success) {
		return { 
			success: false,
			errors: validatedFormData.error.flatten().fieldErrors,
		};
	};

	return { success: true, data: { role: validatedFormData.data.role }};
};
