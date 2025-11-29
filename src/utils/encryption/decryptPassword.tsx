import crypto from "node:crypto";

export default function decryptPassword(encryptedPassword: Buffer, dek: Buffer, iv: Buffer, tag: Buffer) {
    const decipher = crypto.createDecipheriv("aes-256-gcm", dek, iv);
    decipher.setAuthTag(tag);
    const decryptedPassword = Buffer.concat([decipher.update(encryptedPassword), decipher.final()])
    return decryptedPassword.toString("utf8");
}