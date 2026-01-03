"use server";
import { redirect } from "next/navigation";

import { PasswordData } from "@/lib";
import handleAddPassword from "@/api/password/handleAddPassword";

export default async function addPasswordAction(formData: FormData): Promise<void> {
	const rawPasswordData: PasswordData = {
		name: formData.get('name')?.toString() || "",
		uuid: "",
		password: formData.get('password')?.toString() || "",
		url: formData.get('url')?.toString() || "",
	};

	await handleAddPassword(rawPasswordData);
	redirect("/dashboard");
};
