import { SessionOptions } from "iron-session";

export interface UserInterface {
	username: string;
	email: string;
	password: string;
	role: "user" | "admin";
};

export type UserDatabaseRecord = UserData & UserEncryptionData;

export interface UserData {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	role: "user" | "admin";
};

export interface UserEncryptionData {
	encryption_salt: Buffer;
	wrapped_dek: Buffer;
	dek_wrap_iv: Buffer;
	dek_wrap_tag: Buffer;
};

export interface PasswordDatabaseRecord {
	user_id: number;
	uuid: string;
	name: string;
	password: Buffer;
	url: string;
	iv: Buffer;
	tag: Buffer;
};

export interface LoginUserInterface {
	email: string;
	password: string;
};

export interface PasswordData {
	name: string;
	uuid: string;
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
	| { success: true, data: SessionData }
	| { success: false, error: string };

export type PasswordDatabaseResult =
	| { success: true, data: PasswordDatabaseRecord[] }
	| { success: false, error: string };

export type HandleLogin = 
	| { success: true, data: UserDatabaseRecord }
	| { success: false, error: string };

export interface SessionData {
	id: number;
	username: string;
	email: string;
	role: string;
	dek: string;
};


export const sessionOptions: SessionOptions = {
	password: process.env.SESSION_PASSWORD!,	
	cookieName: "session",
	cookieOptions: {
		httpOnly: true,
	},
};
