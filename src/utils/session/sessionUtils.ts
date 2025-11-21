"use server";

import { SessionData, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
	const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
	return session;
};

export async function setSession(sessionData: SessionData) {
	const session = await getSession();

	session.id = sessionData.id;
	session.username = sessionData.username;
	session.email = sessionData.email;
	session.role = sessionData.role;

	await session.save();
};

export async function destroySession() {
	const session = await getSession();
	session.destroy();
};
