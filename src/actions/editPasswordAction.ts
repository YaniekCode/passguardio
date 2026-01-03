"use server";
import { redirect } from "next/navigation";

import handleEditPassword from "@/api/password/handleEditPassword";

export default async function editPasswordAction(formData: FormData): Promise<void> {
	const rawFormData = {
		name: formData.get("name")?.toString() || "",
		uuid: formData.get("uuid")?.toString() || "",
		password: formData.get("password")?.toString() || "",
		url: formData.get("url")?.toString() || "",
	};

	await handleEditPassword(rawFormData);
	redirect("/dashboard");
};
