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

import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import getDataDir from "@/utils/getDataDir";

const SESSION_KEY_FILE = "session.key";
const SESSION_KEY_SIZE = 32;

// Function reads the session key, if it exists in the data/session.key file. If it does not it generates it.
export default function getSessionKey(): Uint8Array {
	const dataDir = getDataDir();
	const keyPath = path.join(dataDir, SESSION_KEY_FILE);

	if (!fs.existsSync(keyPath)) {
		fs.mkdirSync(dataDir, { recursive: true });

		const key = randomBytes(SESSION_KEY_SIZE);
		fs.writeFileSync(keyPath, key, { mode: 0o600 });

		return key;
	};

	return fs.readFileSync(keyPath);
};
