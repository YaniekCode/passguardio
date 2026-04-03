/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2026 YaniekCode
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

export interface User {
	username: string;
	email: string;
	password: string;
	role: UserRoleType;
};

export type UserView = Pick<User, 'username' | 'email' | 'role'>

export type UserRoleType = "user" | "admin";


/*export interface UserData {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	role: "user" | "admin";
};
*/

export interface EncryptionDataType {
	encryption_salt: Buffer;
	wrapped_dek: Buffer;
	dek_wrap_iv: Buffer;
	dek_wrap_tag: Buffer;
};

export interface UserDatabaseRecordType {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	role: UserRoleType;
	encryption_salt: Buffer;
	wrapped_dek: Buffer;
	dek_wrap_iv: Buffer;
	dek_wrap_tag: Buffer;
}

export interface PasswordDatabaseRecordType {
	user_id: number;
	uuid: string;
	website_name: string;
	website_url: string;
	username_or_email: string;
	password: Buffer;
	category: PasswordCategoryType;
	strength: number;
	last_modified: number;
	created_at: number;
	crack_time: string;
	iv: Buffer;
	tag: Buffer;
};

export interface TokenDatabaseRecordType {
	role: UserRoleType;
	token: string;
	expires_at: number;
}


export interface PasswordInfo {
	websiteName: string;
	websiteUrl: string;
	usernameOrEmail: string;
	password: string;
	category: PasswordCategoryType;
}

export interface PasswordData {
	uuid: string;
	websiteName: string;
	websiteUrl: string;
	usernameOrEmail: string;
	password: string;
	category: PasswordCategoryType;
	strength: number;
	lastModified: number;
	createdAt: number;
	crackTime: string;
};

export type PasswordCategoryType =
	| "social"
	| "work"
	| "finance"
	| "entertainment"
	| "shopping"
	| "other";

export type PasswordStatsType = { 
	totalPasswordCount: number,
	strongPasswordCount: number,
	weakPasswordCount: number,
	recentlyAddedPasswordCount: number
};

export type UsersStatsType = { 
	totalUsersCount: number,
	totalPasswordsCount: number,
	strongPasswordsCount: number,
	weakPasswordsCount: number
};

export type FormState =
	| { success: true, message: string }
	| { success: false,
		formErrors?: Record<string, string[]>;
		error?: string;
	};

export type Result<Type> =
    | { success: true, data: Type }
    | { success: false, error: string }

export type MessageResultType =
	| { success: true, message: string }
	| { success: false, error: string }

export type SignupValidationResultType = Result<User>;

export type PasswordByUUIDResultType = Result<PasswordData[]>;

export interface SessionPayload extends JWTPayload {
	id: number;
	username: string;
	role: UserRoleType;
	dek: string;
};
