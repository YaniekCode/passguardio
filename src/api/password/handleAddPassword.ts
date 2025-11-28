"use server";

import { PasswordData, PasswordDatabaseRecord, ResultMessage } from "@/lib";
import encryptPassword from "@/utils/encryptPassword";
import { getSession } from "@/utils/session/sessionUtils";
import addPassword from "@/api/db/addPassword";

export default async function handleAddPassword(passwordData: PasswordData): Promise<ResultMessage> {
	const session = await getSession();

	const { encryptedPassword, passwordUUID, salt, iv } = await encryptPassword(passwordData.password);

	const passwordDatabaseInput: PasswordDatabaseRecord = {
		user_id: session.id,
		uuid: passwordUUID,
		name: passwordData.name,
		password: encryptedPassword,
		url: passwordData.url,
		salt: salt,
		iv: iv,
	};

	const passwordInputResult = addPassword(passwordDatabaseInput);

	return passwordInputResult;


};
