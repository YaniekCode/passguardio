"use server";

import { getSession } from "@/utils/session/sessionUtils";
import getPasswords from "@/api/db/getPasswords";

export default async function handleGetPasswords() {
	const session = await getSession();
	const getPasswordResult = await getPasswords(session.id);

	if (!getPasswordResult.success) {
		return getPasswordResult;
	};

	const passwordList = getPasswordResult.data;
	return getPasswordResult;
};
