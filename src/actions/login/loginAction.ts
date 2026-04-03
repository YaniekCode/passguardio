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

import { redirect } from 'next/navigation';

import type { FormState } from '@/types';
import { validateLoginInput } from '@/utils/validation/loginValidation/validateLoginInput';
import { handleLogin } from '@/backend/login/handleLogin';
import { createSession } from '@/utils/session/sessionUtils';

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
	const rawFormData = {
		email: formData.get('email')?.toString() || "",
		password: formData.get('password')?.toString() || "",
	};

	const inputValidationResult = validateLoginInput(rawFormData);
	if (!inputValidationResult.success) {
		return inputValidationResult;
	};

	const validatedFormData = inputValidationResult.data;

	// Handle user login
	const userLoginResult = await handleLogin(validatedFormData);

	if (!userLoginResult.success) {
		return userLoginResult;
	}

	const userSessionData = userLoginResult.data;
	await createSession(userSessionData);
	redirect("/dashboard");
};
