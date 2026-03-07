import { z } from 'zod';

const FormSchema = z.object({
	email: z.email("Not a valid email address"),
	role: z.enum(["user", "admin"], "Unknown role"), 
});


export type FormState =
	| { success: true, data: { email: string, role: "user" | "admin" }}
	| { success: false, errors: { email?: string[]; role?: string[] }};

export function validateAddUserInput(formData: FormData): FormState {
	const validatedFormData = FormSchema.safeParse({
		email: formData.get("userEmail")?.toString() || "",
		role: formData.get("role")?.toString() || "",
	});

	if (!validatedFormData.success) {
		return { 
			success: false,
			errors: validatedFormData.error.flatten().fieldErrors,
		};
	};

	return { success: true, data: { email: validatedFormData.data.email, role: validatedFormData.data.role }};
};
