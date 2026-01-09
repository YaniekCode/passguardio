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

import path from "node:path";
import fs from "node:fs";

// Outputs the DB dirname based on the running environment
export default function getDataDir(): string {
	// If dirname is specified in .env
	if (process.env.PASSGUARDIO_DB_PATH) {
		return path.dirname(process.env.PASSGUARDIO_DB_PATH);
	};
	
	// If running in a docker container
	if (fs.existsSync("/.dockerenv")) {
		return "/data";
	};

	// If running in dev mode
	return path.resolve("./data");
};
