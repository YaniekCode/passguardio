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

	const passwordList = getPasswordResult.data;
	const userPasswords = await decryptUserPasswords(passwordList, dek);
	return { success: true, data: userPasswords };
};
