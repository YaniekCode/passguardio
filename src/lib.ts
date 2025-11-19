export interface UserInterface {
	username: string;
	email: string;
	password: string;
	role: "user" | "admin";
};

export interface UserDatabaseRecord {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	role: "user" | "admin";
};

export interface LoginUserInterface {
	email: string;
	password: string;
};

export type FormState = {
	success: boolean;
	message?: string;
	error?: string;
};

export type ValidationResult =
	| { success: true, data: UserInterface | LoginUserInterface }
	| { success: false, error: string }

export type ResultMessage = 
	| { success: true; message: string }
	| { success: false; error: string };
