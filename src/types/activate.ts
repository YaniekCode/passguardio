import { TokenDatabaseRecordType } from "@/types";

export type ActivateUserFieldErrors = {
    username?: string;
    email?: string;
    password?: string;
}

export type ActivateTokenState = 
    | {
        success: true;
        data: TokenDatabaseRecordType
    } | {
        success: false,
        not_found: boolean,
        formError?: string,
        error?: string
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