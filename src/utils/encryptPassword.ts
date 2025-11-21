"use server";

import crypto from "node:crypto";

export default async function encryptPassword(password: string): Promise<{ encryptedPassword: string }> {
	const passwordUUID = crypto.randomUUID();
	const salt = crypto.randomBytes(16);
	const iv = crypto.randomBytes(16);

	const key = crypto.pbkdf2Sync(password+passwordUUID, salt, 100000, 32, 'sha256');

	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

	let encryptedPassword = cipher.update(password, 'utf-8', 'hex');
	encryptedPassword += cipher.final('hex');
	
	return { encryptedPassword }

}
