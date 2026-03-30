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

'use server';

import { ActivateUserState } from "@/types/activate";
import { isTokenExpiredOrMissing } from "@/utils/isTokenExpiredOrMissing";
import handleSignup from "@/backend/signup/handleSignup";
import { validateNewUserInput } from "@/utils/validation/validateNewUserInput";
import { deleteToken } from "@/backend/db/deleteToken";

export async function activateUserAction(
    token: string,
    role: "user" | "admin",
    prevState: ActivateUserState,
    formData: FormData
): Promise<ActivateUserState> {
    // Check if the token has expired, is missing or is valid
    const tokenExpiredOrMissingResult = await isTokenExpiredOrMissing(token);
    
    // If the token is missing or has expired we return an error
    if (!tokenExpiredOrMissingResult.success) {
        return tokenExpiredOrMissingResult;
    }


    // Validating the formData except for the role
    const validationResult = validateNewUserInput(formData);

    if (!validationResult.success) {
        return {
            success: false,
            formErrors: validationResult.formErrors,
            error: validationResult.error
        }
    }

    const { username, email, password } = validationResult.data;

    // Creating a new user in the database
    const signupResult = await handleSignup({ username, email, password, role });

    if (!signupResult.success) {
        return {
            success: false,
            error: "Something went wrong",
        }
    }

    await deleteToken(token);
    return {
        success: true,
        message: "Account activated successfully",
    }
}