import { getSession } from "@/utils/session/sessionUtils";
import getPasswords from "@/backend/db/getPasswords";
import decryptUserPasswords from "@/utils/encryption/decryptUserPasswords";

export default async function handleGetPasswords() {
	const session = await getSession();
	if (!session) {
		return;
	};
	const { dek } = session;
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
