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

import crypto from 'node:crypto';

import type { PasswordInfo, PasswordDatabaseRecordType, MessageResultType } from '@/types';
import encryptPassword from '@/utils/encryption/encryptPassword';
import { getPasswordStrengthAndCrackTime } from '@/utils/getPasswordStrengthAndCrackTime';
import { getSession } from '@/utils/session/sessionUtils';
import addPassword from '@/backend/db/addPassword';

export async function handleAddPassword(passwordData: PasswordInfo): Promise<MessageResultType> {
	const session = await getSession();
	if (!session) {
		return { success: false, error: "User not authenticated"};
	};

	// Encrypt the password and generate a random UUID
	const dek = Buffer.from(session.dek, "hex");

	const { encryptedPassword, iv, tag } = encryptPassword(passwordData.password, dek);
	const passwordUUID = crypto.randomUUID();


	// Get password strength and crack time
	const { strength, crack_time } = getPasswordStrengthAndCrackTime(passwordData.password);

	const passwordDatabaseInputRecord: PasswordDatabaseRecordType = {
		user_id: session.id,
		uuid: passwordUUID,
		website_name: passwordData.websiteName,
		website_url: passwordData.websiteUrl,
		username_or_email: passwordData.usernameOrEmail,
		category: passwordData.category,
		password: encryptedPassword,
		strength: strength,
		last_modified: new Date().getTime(),
		created_at: new Date().getTime(),
		crack_time: crack_time,
		iv: iv,
		tag: tag,
	};

	// Add the password to the DB
	const passwordInputResult = await addPassword(passwordDatabaseInputRecord);

	return passwordInputResult;
};
