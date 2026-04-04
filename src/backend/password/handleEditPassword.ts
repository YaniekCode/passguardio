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

import type { PasswordInfo, PasswordDatabaseRecordType, MessageResultType } from '@/types';
import { getSession } from '@/utils/session/sessionUtils';
import isPasswordUUIDInDb from '@/backend/db/isPasswordUUIDInDb';
import { encryptPassword } from '@/utils/encryption/encryptPassword'; 
import { updatePassword } from '@/backend/db/updatePassword';
import { getPasswordStrengthAndCrackTime } from '@/utils/getPasswordStrengthAndCrackTime';

interface PasswordInfoWithUUID extends PasswordInfo {
	uuid: string;
}

export async function handleEditPassword(passwordData: PasswordInfoWithUUID): Promise<MessageResultType> {
	const session = await getSession();
	if (!session) {
		return { success: false, error: "User not authenticated"};
	};
	const { id, dek } = session;

	// Check if the password to edit exists and that the user is the owner of it 
	const isPasswordInDb = await isPasswordUUIDInDb(id, passwordData.uuid);
	if (!isPasswordInDb.success) {
		return { success: false, error: "Password not found" };
	};

	// Encrypt the password data
	const { encryptedPassword, iv, tag } = encryptPassword(passwordData.password, Buffer.from(dek, "hex"));

	// Get password strength and crack time
	const { strength, crackTime } = getPasswordStrengthAndCrackTime(passwordData.password);

	// Construct the database input record
	const passwordDatabaseInputRecord: PasswordDatabaseRecordType = {
		userId: session.id,
		uuid: passwordData.uuid,
		websiteName: passwordData.websiteName,
		websiteUrl: passwordData.websiteUrl,
		usernameOrEmail: passwordData.usernameOrEmail,
		category: passwordData.category,
		password: encryptedPassword,
		strength: strength,
		lastModified: new Date().getTime(),
		createdAt: new Date().getTime(),
		crackTime: crackTime,
		iv: iv,
		tag: tag,
	};

	// Update the password record in DB
	const passwordUpdateResult = await updatePassword(passwordDatabaseInputRecord);

	return passwordUpdateResult;
};
