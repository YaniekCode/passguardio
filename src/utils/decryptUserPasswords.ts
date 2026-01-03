"use server";

import { PasswordDatabaseRecord, PasswordData } from "@/lib";
import decryptPassword from "@/utils/encryption/decryptPassword"; 

export default async function decryptUserPasswords<Type extends PasswordDatabaseRecord | PasswordDatabaseRecord[]>(passwords: Type, dek: string): Promise<PasswordData | PasswordData[]> {
	const formattedDek = Buffer.from(dek, "hex");
	const userPasswords: PasswordData[] = [];

	if (Array.isArray(passwords)) { // if we pass multiple passwords, we decrypt all of them, but it we pass only one we decrypt only one
		passwords.map((userPasswordData) => {
			const decryptedPassword = decryptPassword(userPasswordData.password, formattedDek, userPasswordData.iv, userPasswordData.tag);    
			const passwordObject = { name: userPasswordData.name, uuid: userPasswordData.uuid, password: decryptedPassword, url: userPasswordData.url }
			userPasswords.push(passwordObject);
		});
	} else {
		const decryptedPassword = decryptPassword(passwords.password, formattedDek, passwords.iv, passwords.tag);	
		const passwordObject = { name: passwords.name, uuid: passwords.uuid, password: decryptedPassword, url: passwords.url };
		return passwordObject;
	};

	return userPasswords;
}
