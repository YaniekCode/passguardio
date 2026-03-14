export type ActivateUserFieldErrors = {
    username?: string;
    email?: string;
    password?: string;
}

export type ActivateUserState = 
    | {
        success: true;
        message: string;
    }
    | {
        success: false;
        formErrors?: ActivateUserFieldErrors;
        error?: string;
    }

export type ActivateUserValidationResult =
  | {
      success: true;
      data: {
        username: string;
        email: string;
        password: string;
      };
    }
  | {
      success: false;
	  formErrors: ActivateUserFieldErrors;
      error: string;
    };