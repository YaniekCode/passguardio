export interface UserInterface {
	username: string;
	email: string;
	password: string;
	role: "user" | "admin";
};

export type FormState = {
	success: boolean;
	message?: string;
	error?: string;
};

export type ValidationResult =
	| { success: true, data: UserInterface }
	| { success: false, error: string }

export type ResultMessage = 
	| { success: true; message: string }
	| { success: false; error: string };
