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

export interface UserType {
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

export interface LoginUserInterface {
	email: string;
	password: string;
};

export interface PasswordData {
	uuid: string;
	websiteName: string;
	websiteUrl: string;
	usernameOrEmail: string;
	password: string;
	category: PasswordCategoryType;
	strength: number;
	last_modified: number;
	created_at: number;
	crack_time: string;
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

export type EncryptionData = { encryptedPassword: Buffer, iv: Buffer, tag: Buffer };

export type FormState = {
	success: boolean;
	message?: string;
	error?: string;
};

export type Result<Type> =
    | { success: true, data: Type }
    | { success: false, error: string }

export type MessageResultType =
	| { success: true, message: string }
	| { success: false, error: string }

export type FetchPasswordStatsResultType = Result<PasswordStatsType>;

export type SignupValidationResultType = Result<UserType>;

export type LoginValidationResultType = Result<LoginUserInterface>;

export type LoginResultType = Result<SessionPayload>;

export type PasswordDatabaseResultType = Result<PasswordDatabaseRecordType[]>;

export type HandleLoginResultType = Result<UserDatabaseRecord>;

export type PasswordByUUIDResultType = Result<PasswordData>;

export type FirstUserResultType = Result<boolean>;


export interface SessionPayload extends JWTPayload {
	id: number;
	username: string;
	role: string;
	dek: string;
};
