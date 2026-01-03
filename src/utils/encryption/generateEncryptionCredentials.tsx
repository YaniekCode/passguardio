import crypto from "node:crypto";

import deriveKEK from "@/utils/encryption/deriveKEK"; 
import { UserEncryptionData } from "@/lib";

export default function generateEncryptionCredentials(password: string): UserEncryptionData {
	const encryption_salt = crypto.randomBytes(32);	

	const dek = crypto.randomBytes(32);
	const kek = deriveKEK(password, encryption_salt);

	const wrap = wrapDEK(dek, kek);

	const userEncryptionData: UserEncryptionData = {
		encryption_salt,
		wrapped_dek: wrap.wrapped,
		dek_wrap_iv: wrap.iv,
		dek_wrap_tag: wrap.tag
	};

	return userEncryptionData;
};

function wrapDEK(dek: Buffer, kek: Buffer) {
	const iv = crypto.randomBytes(12);
	const cipher = crypto.createCipheriv("aes-256-gcm", kek, iv);

	const wrapped = Buffer.concat([cipher.update(dek), cipher.final()]);
	const tag = cipher.getAuthTag();
	return { wrapped, iv, tag };
};
