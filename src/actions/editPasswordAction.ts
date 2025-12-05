"use server";

import handleEditPassword from "@/api/password/handleEditPassword";

export default async function editPasswordAction(formData: FormData) {
	const rawFormData = {
		name: formData.get("name")?.toString() || "",
		uuid: formData.get("uuid")?.toString() || "",
		password: formData.get("password")?.toString() || "",
		url: formData.get("url")?.toString() || "",
	};

	const result = await handleEditPassword(rawFormData);
	console.log(result);

	// todo: handling password update result

};
