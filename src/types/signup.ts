export type CreateUserResult =
    {
        success: true,
        message: string
    } |
    {
        success: false,
        uniqueError: boolean,
        error: string
    }