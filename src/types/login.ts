import type { Result, SessionPayload } from '@/types';

export type LoginResultType = Result<SessionPayload>;

export type LoginUserInterface = {
    email: string,
    password: string
};

export type LoginValidationResultType = Result<LoginUserInterface>;