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

"use server";

import { PasswordDatabaseRecord, PasswordData } from "@/lib";
import decryptPassword from "@/utils/encryption/decryptPassword"; 

export default async function decryptUserPasswords<Type extends PasswordDatabaseRecord | PasswordDatabaseRecord[]>(passwords: Type, dek: string): Promise<PasswordData | PasswordData[]> {
	const formattedDek = Buffer.from(dek, "hex");
	const userPasswords: PasswordData[] = [];

	if (Array.isArray(passwords)) { // if we pass multiple passwords, we decrypt all of them, but it we pass only one we decrypt only one
		passwords.map((userPasswordData) => {
			const decryptedPassword = decryptPassword(userPasswordData.password, formattedDek, userPasswordData.iv, userPasswordData.tag);    
			const passwordObject = { name: userPasswordData.name, uuid: userPasswordData.uuid, password: decryptedPassword, url: userPasswordData.url }
			userPasswords.push(passwordObject);
		});
	} else {
		const decryptedPassword = decryptPassword(passwords.password, formattedDek, passwords.iv, passwords.tag);	
		const passwordObject = { name: passwords.name, uuid: passwords.uuid, password: decryptedPassword, url: passwords.url };
		return passwordObject;
	};

	return userPasswords;
}
