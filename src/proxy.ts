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

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from "@/utils/session/sessionUtils";
import { isFirstUser } from "@/backend/db/isFirstUser";
 
export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isFirst = await isFirstUser();

	// If the user is first, they get redirected to the sign up page
	if (isFirst.success && isFirst.data) {
		if (pathname !== "/") {
			return NextResponse.redirect(new URL("/", request.url));
		};
		return NextResponse.next();
	} else {
		if (pathname == "/") {
			return NextResponse.redirect(new URL("/login", request.url));
		};
	};

	// If the user is not first we check if the session exists
	if (pathname.startsWith("/dashboard")) {
		const session = await getSession();

		if (!session || !session.username) {
 			return NextResponse.redirect(new URL('/login', request.url))
		};
	};

	return NextResponse.next();
}
 
export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|api).*)",
	],
};
