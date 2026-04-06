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

import { revalidatePath } from "next/cache";

import { type FormState } from "@/types";
import { handleEditPassword } from "@/backend/password/handleEditPassword";
import { validateAddPasswordInput } from "@/utils/validation/validateAddPasswordInput";

export async function editPasswordAction(
	uuid: string,
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const validatedFormData = validateAddPasswordInput(formData);

	const websiteName = formData.get("websiteName")?.toString() || "";
	const websiteUrl = formData.get("websiteUrl")?.toString() || "";
	const usernameOrEmail = formData.get("usernameOrEmail")?.toString() || "";

	// If we don't succeed we return the error
	if (!validatedFormData.success) {
		return {
			success: false,
			formErrors: validatedFormData.errors,
		};
	}

	// If we succeed in validating the form data we proceed
	const { password, category } = validatedFormData.data;

	const validatedPasswordData = {
		uuid,
		websiteName,
		websiteUrl,
		usernameOrEmail,
		password,
		category,
	};

	// Adding the password data to the DB
	const passwordInputResult = await handleEditPassword(validatedPasswordData);

	revalidatePath("/dashboard");

	// Return the error if it occured
	if (!passwordInputResult.success) {
		return {
			success: false,
			error: "An error occured when updating the password",
		};
	}

	return {
		success: true,
		message: "Password updated successfully",
	};
}
