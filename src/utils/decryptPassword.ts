"use server";

export default async function decryptPassword() {
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

};
