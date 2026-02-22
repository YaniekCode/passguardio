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
import { validate as uuidValidate } from "uuid";
import { getSession } from "@/utils/session/sessionUtils";
import { revalidatePath } from "next/cache";

import deletePassword from "@/api/db/deletePassword";

export async function deletePasswordAction(passwordUUID: string): Promise<void> {
	const isValidUUID = uuidValidate(passwordUUID);
	if (!isValidUUID) {
		throw new Error("Invalid UUID");
	};

	const session = await getSession();
	if (session) {
		const { id } = session;
		await deletePassword(id, passwordUUID);
	};

	revalidatePath("/dashboard");
};
