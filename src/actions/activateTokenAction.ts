'use server';

import { getDataByToken } from '@/backend/db/getDataByToken';
import { type TokenDatabaseRecordType } from '@/types';

export type State = 
    | { success: true, data: TokenDatabaseRecordType }
    | { success: false, not_found: boolean, formError?: string, error?: string }

export async function activateTokenAction(
    prevState: State,
    formData: FormData
): Promise<State> {
    const token = formData.get("token")?.toString() || "";

    const tokenRegex = /^[0-9]{6}$/;

    if (!tokenRegex.test(token)) {
        return {
            success: false,
            not_found: false,
            formError: "Not an activation token"
        };
    }

    const tokenData = await getDataByToken(token);

    if (!tokenData.success || !tokenData.data) {
        return { success: false, not_found: true, formError: "Token not found" };
    }

    const tokenExpiryDate = tokenData.data.expires_at;
    const currentTime = Date.now();

    if (currentTime > tokenExpiryDate) {
        return { success: false, not_found: false, formError: "Token has expired" };
    }

    return {
        success: true,
        data: tokenData.data,
    };
}
