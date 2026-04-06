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

"use server";

import { redirect } from "next/navigation";

import type { User, FormState } from "@/types";
import { validateSignupInput } from "@/utils/validation/signupValidation/validateSignupInput";
import { handleSignup } from "@/backend/signup/handleSignup";

export async function signupAction(prevState: FormState, formData: FormData): Promise<FormState> {
	const rawFormData: User = {
		username: formData.get("username")?.toString() || "",
		email: formData.get("email")?.toString() || "",
		password: formData.get("password")?.toString() || "",
		role: "admin", // when a user signs up they automatically become an admin
	};

	const validationResult = validateSignupInput(rawFormData);
	if (!validationResult.success) {
		return validationResult;
	}

	const userData = validationResult.data;
	const signupResult = await handleSignup(userData);

	if (!signupResult.success) {
		return signupResult;
	}

	redirect("/login");
}
