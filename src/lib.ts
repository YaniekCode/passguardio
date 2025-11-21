import { SessionOptions } from "iron-session";

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

export interface PasswordData {
	name: string;
	password: string;
	url: string;
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

export type LoginResult = 
	| { success: true, data: UserDatabaseRecord }
	| { success: false, error: string };

export interface SessionData {
	id: number;
	username: string;
	email: string;
	role: string;
};


export const sessionOptions: SessionOptions = {
	password: process.env.SESSION_PASSWORD!,	
	cookieName: "session",
	cookieOptions: {
		httpOnly: true,
	},
};
