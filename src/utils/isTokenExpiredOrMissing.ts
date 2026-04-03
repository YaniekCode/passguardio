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

import { getDataByToken } from "@/backend/db/getDataByToken";
import { ActivateTokenState } from "@/types/activate";

export async function isTokenExpiredOrMissing(token: string): Promise<ActivateTokenState> {
    // Get the token data(role, token, expires_at) from the DB
    const tokenData = await getDataByToken(token);

    if (!tokenData.success || !tokenData.data) {
        return { success: false, notFound: true, error: "Token not found" };
    }

    const tokenExpiryDate = tokenData.data.expiresAt;
    const currentTime = Date.now();

    // Check if the token has already expired
    if (currentTime > tokenExpiryDate) {
        return { success: false, notFound: false, error: "Token has expired" };
    }

    return {
        success: true,
        data: tokenData.data,
    }
}