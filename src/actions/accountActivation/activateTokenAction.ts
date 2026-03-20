'use server';

import { getDataByToken } from '@/backend/db/getDataByToken';
import { type ActivateTokenState } from '@/types/activate';

export async function activateTokenAction(
    prevState: ActivateTokenState,
    formData: FormData
): Promise<ActivateTokenState> {
    const token = formData.get("token")?.toString() || "";


    const tokenRegex = /^[0-9]{6}$/;
    // Test if a the token has a valid syntax(6 digits)
    if (!tokenRegex.test(token)) {
        return {
            success: false,
            not_found: false,
            formError: "Not an activation token"
        };
    }

    // Get the token data(role, token, expires_at) from the DB
    const tokenData = await getDataByToken(token);

    if (!tokenData.success || !tokenData.data) {
        return { success: false, not_found: true, error: "Token not found" };
    }

    const tokenExpiryDate = tokenData.data.expires_at;
    const currentTime = Date.now();

    // Check if the token has already expired
    if (currentTime > tokenExpiryDate) {
        return { success: false, not_found: false, error: "Token has expired" };
    }

    return {
        success: true,
        data: tokenData.data,
    };
}
