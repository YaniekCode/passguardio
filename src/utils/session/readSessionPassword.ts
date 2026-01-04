import { SessionOptions } from "iron-session";
import path from "node:path";
import fs from "fs";
import crypto from "crypto";

const SECRET_FILE = path.resolve('data/mydb.db');

function getSessionPassword() {
	if (process.env.SESSION_PASSWORD) {
		return process.env.SESSION_PASSWORD;
	};

	if (fs.existsSync(SECRET_FILE)) {
		return fs.readFileSync(SECRET_FILE, "utf-8");
	};

	const secret = crypto.randomBytes(32).toString("hex");
	fs.writeFileSync(SECRET_FILE, secret, { mode: 0o600 });

	console.warn("Generated and stored session secret");
	return secret;
};

export const sessionOptions: SessionOptions = {
	password: getSessionPassword(),
	cookieName: "session",
	cookieOptions: {
		secure: true,
		httpOnly: true,
		maxAge: undefined,
	},
};
