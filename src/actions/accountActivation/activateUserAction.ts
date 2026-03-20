'use server';

import { ActivateUserState } from "@/types/activate";
import handleSignup from "@/backend/signup/handleSignup";
import { validateNewUserInput } from "@/utils/validation/validateNewUserInput";
import { deleteToken } from "@/backend/db/deleteToken";

export async function activateUserAction(
    token: string,
    role: "user" | "admin",
    prevState: ActivateUserState,
    formData: FormData
): Promise<ActivateUserState> {
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

    if (signupResult.success) {
        await deleteToken(token);
        return {
            success: true,
            message: "Account activated successfully",
        }
    } else {
        return {
            success: false,
            error: "Something went wrong",
        }
    }
}