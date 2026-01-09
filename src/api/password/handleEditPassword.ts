"use server";

import { getSession } from "@/utils/session/sessionUtils";
import { PasswordData } from "@/lib";
import isPasswordUUIDInDb from "@/api/db/isPasswordUUIDInDb";
import encryptPassword from "@/utils/encryption/encryptPassword"; 
import updatePassword from "@/api/db/updatePassword";

export default async function handleEditPassword(passwordData: PasswordData) {
	const session = await getSession();
	if (!session) {
		return;
	};
	const { id, dek }  = session;

	const isPasswordInDb = await isPasswordUUIDInDb(id, passwordData.uuid); // checking if the password to edit exists and that the user is the owner of it 

	if (!isPasswordInDb.success) {
		return { success: false, error: "Password not found" };
	};

	const { encryptedPassword, iv, tag } = encryptPassword(passwordData.password, Buffer.from(dek, "hex"));
	const updatedPasswordEntry = { user_id: id, uuid: passwordData.uuid, name: passwordData.name, password: encryptedPassword, url: passwordData.url, iv: iv, tag: tag }; 

	const passwordUpdateResult = updatePassword(updatedPasswordEntry);

	return passwordUpdateResult;
};
