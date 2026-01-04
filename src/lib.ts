export interface UserInterface {
	username: string;
	email: string;
	password: string;
	role: "user" | "admin";
};

export type UserDatabaseInsert = Omit<UserData, "id"> & UserEncryptionData;
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

export type EncryptionData = { encryptedPassword: Buffer, iv: Buffer, tag: Buffer };

export type FormState = {
	success: boolean;
	message?: string;
	error?: string;
};


export type SignupValidationResult =
	| { success: true, data: UserInterface}
	| { success: false, error: string}

export type LoginValidationResult =
	| { success: true, data: LoginUserInterface}
	| { success: false, error: string}


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

export type PasswordByUUIDResult =
	| { success: true, data: PasswordData }
	| { success: false, error: string };

export interface SessionData {
	id: number;
	username: string;
	email: string;
	role: string;
	dek: string;
};
