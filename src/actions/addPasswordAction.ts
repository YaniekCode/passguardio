"use server";

import { PasswordData } from "@/lib";
import handleAddPassword from "@/api/password/handleAddPassword";

export default async function addPasswordAction(formData: FormData) {
	const rawPasswordData: PasswordData = {
		name: formData.get('name')?.toString() || "",
		uuid: "",
		password: formData.get('password')?.toString() || "",
		url: formData.get('url')?.toString() || "",
	};

	const result = await handleAddPassword(rawPasswordData);

};
