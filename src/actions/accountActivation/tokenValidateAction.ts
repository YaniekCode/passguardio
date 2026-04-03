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

import type { ActivateTokenState } from '@/types/activate';
import { isTokenExpiredOrMissing } from '@/utils/isTokenExpiredOrMissing';

export async function tokenValidateAction(
    prevState: ActivateTokenState,
    formData: FormData
): Promise<ActivateTokenState> {
    const token = formData.get("token")?.toString() || "";


    const tokenRegex = /^[0-9]{6}$/;
    // Test if a the token has a valid syntax(6 digits)
    if (!tokenRegex.test(token)) {
        return {
            success: false,
            notFound: false,
            formError: "Not an activation token"
        };
    }

    // Check if the token has expired, is missing or is valid
    const tokenExpiredOrMissingResult = await isTokenExpiredOrMissing(token);

    return tokenExpiredOrMissingResult;
}
