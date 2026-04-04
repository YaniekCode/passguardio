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

type DecryptPasswordProps = {
	encryptedPassword: Buffer,
	dek: Buffer,
	iv: Buffer,
	tag: Buffer
}

export function decryptPassword({encryptedPassword, dek, iv, tag}: DecryptPasswordProps): string {
	const decipher = crypto.createDecipheriv("aes-256-gcm", dek, iv);
	decipher.setAuthTag(tag);

	const decryptedPassword = Buffer.concat([decipher.update(encryptedPassword), decipher.final()])
	return decryptedPassword.toString("utf8");
}
