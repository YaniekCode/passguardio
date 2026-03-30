'use server';

import { type ActivateTokenState } from '@/types/activate';
import { isTokenExpiredOrMissing } from '@/utils/isTokenExpiredOrMissing';

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

    // Check if the token has expired, is missing or is valid
    const tokenExpiredOrMissingResult = await isTokenExpiredOrMissing(token);

    return tokenExpiredOrMissingResult;
}
