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

import type { PasswordDatabaseRecordType, PasswordData } from '@/types';
import decryptPassword from '@/utils/encryption/decryptPassword'; 

export default async function decryptUserPasswords(
	passwords: PasswordDatabaseRecordType[],
	dek: string
): Promise<PasswordData[]> {
	const formattedDek = Buffer.from(dek, "hex");

	const userPasswords: PasswordData[] = [];

	// Go through each password, decrypt it and add it to an array
	passwords.forEach((userPasswordData) => {
		const decryptedPassword = decryptPassword(userPasswordData.password, formattedDek, userPasswordData.iv, userPasswordData.tag);    
		const passwordObject = {
			uuid: userPasswordData.uuid,
			websiteName: userPasswordData.website_name,
			websiteUrl: userPasswordData.website_url,
			usernameOrEmail: userPasswordData.username_or_email,
			password: decryptedPassword,
			category: userPasswordData.category,
			strength: userPasswordData.strength,
			lastModified: userPasswordData.last_modified,
			createdAt: userPasswordData.created_at,
			crackTime: userPasswordData.crack_time,
		}
		userPasswords.push(passwordObject);
	});
	
	return userPasswords;
}
