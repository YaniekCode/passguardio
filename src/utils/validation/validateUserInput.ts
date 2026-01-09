/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2025 YaniekCode
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
