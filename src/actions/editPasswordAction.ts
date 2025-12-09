"use server";

import handleEditPassword from "@/api/password/handleEditPassword";

export default async function editPasswordAction(formData: FormData){
	const rawFormData = {
		name: formData.get("name")?.toString() || "",
		uuid: formData.get("uuid")?.toString() || "",
		password: formData.get("password")?.toString() || "",
		url: formData.get("url")?.toString() || "",
	};

	const handleEditPasswordResult = await handleEditPassword(rawFormData);
	return handleEditPasswordResult; 
};
