"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

import { SessionData } from "@/lib";
import { sessionOptions } from "@/utils/session/readSessionPassword";

export async function getSession() {
	const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
	return session;
};

export async function setSession(sessionData: SessionData): Promise<void> {
	const session = await getSession();

	session.id = sessionData.id;
	session.username = sessionData.username;
	session.email = sessionData.email;
	session.role = sessionData.role;
	session.dek = sessionData.dek;

	await session.save();
};

export async function destroySession(): Promise<void> {
	const session = await getSession();
	session.destroy();
};
