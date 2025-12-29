"use server";

import { validate as uuidValidate } from "uuid";
import { getSession } from "@/utils/session/sessionUtils";
import deletePassword from "@/api/db/deletePassword";
import { revalidatePath } from "next/cache";

export default async function deletePasswordAction(formData: FormData): Promise<void> {
	const rawFormData = {
		uuid: formData.get('uuid')?.toString() || "",
	};

	const isValidUUID = uuidValidate(rawFormData.uuid);
	if (!isValidUUID) {
		throw new Error("Invalid UUID");
	};

	const session = await getSession();
	const { id } = session;

	await deletePassword(id, rawFormData.uuid);
	revalidatePath("/dashboard");
};
