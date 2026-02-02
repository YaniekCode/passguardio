/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2025 YaniekCode
 *
 * This file is part of PassGuardio.
 *
 * PassGuardio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PassGuardio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PassGuardio.  If not, see <https://www.gnu.org/licenses/>.
*/

import type { JWTPayload } from 'jose';

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
	website_name: string;
	website_url: string;
	password: Buffer;
	category: string;
	strength: number;
	last_modified: Date;
	crack_time: string;
	iv: Buffer;
	tag: Buffer;
};

export interface LoginUserInterface {
	email: string;
	password: string;
};

export interface PasswordData {
	websiteName: string;
	websiteUrl: string;
	usernameOrEmail: string;
	password: string;
	category: string;
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
	| { success: true, data: SessionPayload }
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

export type FirstUserResult =
	| { success: true, data: boolean }
	| { success: false, error: string };

export interface SessionPayload extends JWTPayload {
	id: number;
	username: string;
	role: string;
	dek: string;
};
