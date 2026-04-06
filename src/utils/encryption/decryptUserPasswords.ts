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

import type { PasswordDatabaseRecordType, PasswordData } from "@/types";
import { decryptPassword } from "@/utils/encryption/decryptPassword";

export default async function decryptUserPasswords(
	passwords: PasswordDatabaseRecordType[],
	dek: string,
): Promise<PasswordData[]> {
	const formattedDek = Buffer.from(dek, "hex");

	const userPasswords: PasswordData[] = [];

	// Go through each password, decrypt it and add it to an array
	passwords.forEach((userPasswordData) => {
		const decryptedPassword = decryptPassword({
			encryptedPassword: userPasswordData.password,
			dek: formattedDek,
			iv: userPasswordData.iv,
			tag: userPasswordData.tag,
		});

		const passwordObject = {
			uuid: userPasswordData.uuid,
			websiteName: userPasswordData.websiteName,
			websiteUrl: userPasswordData.websiteUrl,
			usernameOrEmail: userPasswordData.usernameOrEmail,
			password: decryptedPassword,
			category: userPasswordData.category,
			strength: userPasswordData.strength,
			lastModified: userPasswordData.lastModified,
			createdAt: userPasswordData.createdAt,
			crackTime: userPasswordData.crackTime,
		};
		userPasswords.push(passwordObject);
	});

	return userPasswords;
}
