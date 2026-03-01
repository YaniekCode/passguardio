import { z } from 'zod';

import { PasswordCategoryType } from '@/types';

const FormSchema = z.object({
	password: z.string().min(4, "Password must be at least 4 characters long"),
	category: z.enum(["social", "work", "finance", "entertainment", "shopping", "other"], "Unknown password category"), 
});


export type FormState =
	| { success: true, data: { password: string, category: PasswordCategoryType }}
	| { success: false, errors: { password?: string[]; category?: string[] }};

export function validateAddPasswordInput(formData: FormData): FormState {
	const validatedFormData = FormSchema.safeParse({
		password: formData.get("password")?.toString() || "",
		category: formData.get("category")?.toString() || "",
	});

	if (!validatedFormData.success) {
		return { 
			success: false,
			errors: validatedFormData.error.flatten().fieldErrors,
		};
	};

	return { success: true, data: { password: validatedFormData.data.password, category: validatedFormData.data.category }};
};
