"use server";

import { PasswordData } from "@/lib";
import encryptPassword from "@/utils/encryptPassword";

export default async function handleAddPassword(passwordData: PasswordData) {
	const { encryptedPassword } = await encryptPassword(passwordData.password);

	console.log(encryptedPassword);


};
