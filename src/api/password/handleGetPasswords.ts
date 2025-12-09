"use server";

import { getSession } from "@/utils/session/sessionUtils";
import getPasswords from "@/api/db/getPasswords";
import decryptUserPasswords from "@/utils/decryptUserPasswords";

export default async function handleGetPasswords() {
	const session = await getSession();
	const dek = session.dek;
	const getPasswordResult = await getPasswords(session.id);

	if (!getPasswordResult.success) {
		return getPasswordResult;
	};

	const passwordList = Array.isArray(getPasswordResult.data)
		? getPasswordResult.data
		: [getPasswordResult.data];

	const userPasswordsRaw = await decryptUserPasswords(passwordList, dek);
	const userPasswords = Array.isArray(userPasswordsRaw)
		? userPasswordsRaw
		: [userPasswordsRaw];
	return { success: true, data: userPasswords };
};
