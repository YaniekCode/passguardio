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

import { z } from "zod";

const usernameField = z.string()
	.min(3, "Username must be at least 3 characters long.")
	.max(50, "Username cannot be longer than 50 characters.")
	.regex(/^[\p{L}0-9_\- ]+$/u, "Username can contain only letters, numbers, underscores, hyphens and spaces");

const emailField = z.email();

const passwordField = z.string()
	.min(8, "Password must be at least 8 characters long.")
	.max(100, "Password cannot be longer than 100 characters.")
	.refine((val) => !/\s/.test(val), "Password cannot contain whitespace characters (e.g., space, tab).");

const roleField = z.enum(["user", "admin"]);


export const SignupSchema = z.object({
	username: usernameField,
	email: emailField,
	password: passwordField,
	role: roleField,
});

export const LoginSchema = z.object({
	email: emailField,
	password: passwordField,
});
