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

import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';

import { addToken } from '@/backend/db/addToken';
import { validateAddUserInput } from '@/utils/validation/validateAddUserInput';

export type AddUserState =
	| { success: true, token: string }
	| { success: false,
		formErrors?: Record<string, string[]>;
		error?: string;
	};

// Function which generates a 6 digit token
function generateToken(): string {
	return crypto.randomInt(100000, 999999).toString();
};


export async function addUserAction(prevState: AddUserState, formData: FormData): Promise<AddUserState> {
	const validatedFormData = validateAddUserInput(formData);

	// Return the error if it occured during validation
	if (!validatedFormData.success) {
		return {
			success: false,
			formErrors: validatedFormData.errors
		};
	};

	const { role } = validatedFormData.data;

	const token = generateToken();
	const tokenExpiryDate = new Date();
	tokenExpiryDate.setDate(tokenExpiryDate.getDate() + 7);


	// Add the token data to the DB
	const tokenInputResult = await addToken(role, token, tokenExpiryDate.getTime());

	revalidatePath("/dashboard/users");

	// Return the error if it occured
	if (!tokenInputResult.success) {
		return {
			success: false,
			error: "An error occured when adding the token",
		};
	}

	return {
		success: true,
		token: token,
	};

};
