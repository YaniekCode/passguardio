import crypto from "node:crypto";

export default function encryptPassword(password: string, dek: Buffer) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", dek, iv);
    const encryptedPassword = Buffer.concat([cipher.update(password, "utf-8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return { encryptedPassword, iv, tag };
}