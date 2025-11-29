import crypto from "node:crypto";

export default function unwrapDEK(wrapped: Buffer, iv: Buffer,  tag: Buffer, kek: Buffer) {
	const decipher = crypto.createDecipheriv("aes-256-gcm", kek, iv);
	decipher.setAuthTag(tag);
	return Buffer.concat([decipher.update(wrapped), decipher.final()]);
};
