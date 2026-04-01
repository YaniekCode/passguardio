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

import type { User, MessageResultType } from "@/types";
import createTables from "@/backend/db/createTables";
import createUser from "@/backend/db/createUser";
import { generatePasswordHash } from "@/utils/hashing/generatePasswordHash";
import generateEncryptionCredentials from "@/utils/encryption/generateEncryptionCredentials";

export async function handleSignup(userData: User): Promise<MessageResultType> {
	await createTables(); // create default tables in the DB

	const passwordHash = generatePasswordHash(userData.password);
	const userEncryptionData = generateEncryptionCredentials(userData.password);
	const user = { ...userData, password_hash: passwordHash, ...userEncryptionData};

	const dbResult = await createUser(user);
	if (dbResult.success) {
		return { success: true, message: "User created successfully" };
	} else {
		console.log(`An error occured when creating a user. Error: ${dbResult.error}`);
		return { success: false, error: dbResult.error };
	};

};


