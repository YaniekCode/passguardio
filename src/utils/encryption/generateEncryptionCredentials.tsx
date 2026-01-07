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

import crypto from "node:crypto";

import deriveKEK from "@/utils/encryption/deriveKEK"; 
import { UserEncryptionData } from "@/lib";

export default function generateEncryptionCredentials(password: string): UserEncryptionData {
	const encryption_salt = crypto.randomBytes(32);	

	const dek = crypto.randomBytes(32);
	const kek = deriveKEK(password, encryption_salt);

	const wrap = wrapDEK(dek, kek);

	const userEncryptionData: UserEncryptionData = {
		encryption_salt,
		wrapped_dek: wrap.wrapped,
		dek_wrap_iv: wrap.iv,
		dek_wrap_tag: wrap.tag
	};

	return userEncryptionData;
};

function wrapDEK(dek: Buffer, kek: Buffer) {
	const iv = crypto.randomBytes(12);
	const cipher = crypto.createCipheriv("aes-256-gcm", kek, iv);

	const wrapped = Buffer.concat([cipher.update(dek), cipher.final()]);
	const tag = cipher.getAuthTag();
	return { wrapped, iv, tag };
};
