"use server";

import { PasswordDatabaseRecord, PasswordData } from "@/lib";
import decryptPassword from "@/utils/encryption/decryptPassword"; 

export default async function decryptUserPasswords(passwords: PasswordDatabaseRecord[], dek: string): Promise<PasswordData[]> {
    const formattedDek = Buffer.from(dek, "hex");
    const userPasswords: PasswordData[] = [];

    passwords.map((userPasswordData) => {
        const decryptedPassword = decryptPassword(userPasswordData.password, formattedDek, userPasswordData.iv, userPasswordData.tag);    
        const passwordObject = { name: userPasswordData.name, password: decryptedPassword, url: userPasswordData.url }
        userPasswords.push(passwordObject);
    })

    return userPasswords;
}