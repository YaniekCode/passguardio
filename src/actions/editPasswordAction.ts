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
import { revalidatePath } from 'next/cache';

import { PasswordData } from '@/lib';
import handleEditPassword from "@/api/password/handleEditPassword";

export async function editPasswordAction(formData: FormData): Promise<void> {
	const rawPasswordData: PasswordData = {
		uuid: formData.get("uuid")?.toString() || "",
		websiteName: formData.get("websiteName")?.toString() || "",
		websiteUrl: formData.get("websiteUrl")?.toString() || "",
		usernameOrEmail: formData.get("usernameOrEmail")?.toString() || "",
		password: formData.get("password")?.toString() || "",
		category: formData.get("category")?.toString() || "",
	};

	await handleEditPassword(rawPasswordData);
	revalidatePath("/dashboard");
};
