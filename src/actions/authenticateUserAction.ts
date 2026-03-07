'use server';

import { getDataByToken } from '@/backend/db/getDataByToken';
import { type TokenDatabaseRecordType } from '@/types';

export type State = 
    | { success: true, data: TokenDatabaseRecordType | undefined }
    | { success: false, formError?: string, error?: string }

export async function authenticateUserAction(
    prevState: State,
    formData: FormData
): Promise<State> {
    const token = formData.get("token")?.toString() || "";

    const tokenRegex = /^[0-9]{6}$/;

    if (!tokenRegex.test(token)) {
        return {
            success: false,
            formError: "Not an activation token"
        };
    }

    const tokenData = await getDataByToken(token);

    if (!tokenData.success) {
        return { success: false, error: "An error occurred when reading the token" };
    }

    if (!tokenData.data) {
        return { success: false, formError: "Invalid activation token" };
    }

    const tokenExpiryDate = tokenData.data.expires_at;
    const currentTime = Date.now();

    if (currentTime > tokenExpiryDate) {
        return { success: false, formError: "Token has expired" };
    }

    return {
        success: true,
        data: tokenData.data,
    };

}
