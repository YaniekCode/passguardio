/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2026 YaniekCode
 *
 * This file is part of PassGuardio.
 *
 * PassGuardio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PassGuardio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PassGuardio.  If not, see <https://www.gnu.org/licenses/>.
 */

import { z } from "zod";

import type { PasswordCategoryType } from "@/types";

const FormSchema = z.object({
	password: z.string().min(4, "Password must be at least 4 characters long"),
	category: z.enum(
		["social", "work", "finance", "entertainment", "shopping", "other"],
		"Unknown password category",
	),
});

export type FormState =
	| {
			success: true;
			data: {
				password: string;
				category: PasswordCategoryType;
			};
	  }
	| {
			success: false;
			errors: {
				password?: string[];
				category?: string[];
			};
	  };

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
	}

	return {
		success: true,
		data: {
			password: validatedFormData.data.password,
			category: validatedFormData.data.category,
		},
	};
}
