"use server";

import crypto from "node:crypto";
import { PasswordData, PasswordDatabaseRecord, ResultMessage } from "@/lib";
import encryptPassword from "@/utils/encryption/encryptPassword";
import { getSession } from "@/utils/session/sessionUtils";
import addPassword from "@/api/db/addPassword";

export default async function handleAddPassword(passwordData: PasswordData): Promise<ResultMessage> {
	const session = await getSession();

	const dek = Buffer.from(session.dek, "hex"); // convert dek from string to Buffer type

	const { encryptedPassword, iv, tag } = encryptPassword(passwordData.password, dek);
	const passwordUUID = crypto.randomUUID();

	const passwordDatabaseInput: PasswordDatabaseRecord = {
		user_id: session.id,
		uuid: passwordUUID,
		name: passwordData.name,
		password: encryptedPassword,
		url: passwordData.url,
		iv: iv,
		tag: tag,
	};

	const passwordInputResult = addPassword(passwordDatabaseInput);

	return passwordInputResult;


};
