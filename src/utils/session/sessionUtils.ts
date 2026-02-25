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

import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from "@/lib";

import { getSessionKey } from "@/utils/session/getSessionKey";

const secretKey = getSessionKey();
if (!secretKey) {
	throw new Error('Session key does not exist');
};

// Function encrypts the session payload
export async function encryptSession(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(secretKey)
};

// Function decrypts the session payload
export async function decryptSession(session: string | undefined = ''): Promise<SessionPayload | undefined >{
	try {
		const { payload } = await jwtVerify<SessionPayload>(session, secretKey, {
			algorithms: ['HS256'],
		});
		return payload;
	} catch (error) {
		console.log(`Failed to verify session. Error: ${error}`);
	};
};

// Function creates the session which expires after 7 days
export async function createSession(payload: SessionPayload) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
	const session = await encryptSession({ ...payload, expiresAt });
	const cookieStore = await cookies();

	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	});
};

// Function reads the session, decrypts it and returns
export async function getSession() {
	const session = (await cookies()).get('session')?.value;
	if (!session) return null;
	return await decryptSession(session);
};
