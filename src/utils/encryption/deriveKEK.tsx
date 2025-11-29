import crypto from "node:crypto";

const PBKDF2_ITER = 310000;

export default function deriveKEK(password: string, salt: Buffer) {
	return crypto.pbkdf2Sync(password, salt, PBKDF2_ITER, 32, "sha512"); 
};
