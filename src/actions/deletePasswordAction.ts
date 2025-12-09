"use server";

import { validate as uuidValidate } from "uuid";
import { getSession } from "@/utils/session/sessionUtils";
import deletePassword from "@/api/db/deletePassword";

export default async function deletePasswordAction(formData: FormData) {
	const rawFormData = {
		uuid: formData.get('uuid')?.toString() || "",
	};

	const isValidUUID = uuidValidate(rawFormData.uuid);
	if (!isValidUUID) {
		return { success: false, error: "Invalid UUID" };
	};

	const session = await getSession();
	const { id } = session;

	const deletePasswordResult = await deletePassword(id, rawFormData.uuid);
	return deletePasswordResult;
	
};
