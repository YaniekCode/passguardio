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

import type { ActivateUserFieldErrors, ActivateUserValidationResult } from "@/types/activate";
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
			data: validatedFormData.data,
		};
	}

	const flattened = validatedFormData.error.flatten();

	const formErrors: ActivateUserFieldErrors = {
		username: flattened.fieldErrors.username?.[0],
		email: flattened.fieldErrors.email?.[0],
		password: flattened.fieldErrors.password?.[0],
	};

	return {
		success: false,
		formErrors: formErrors,
		error: "Validation failed",
	};
}
