"use server";

import getPasswordByUUID from "@/api/db/getPasswordByUUID";
import PasswordField from "@/components/PasswordField";
import { validate as uuidValidate } from "uuid";

interface PageProps {
	params: {
		uuid: string;	
	};
};

export default async function ViewPassword({ params }: PageProps) {
	const { uuid } = await params;
	const isValidUUID = uuidValidate(uuid);
	
	if (!isValidUUID) {
		return (
			<h1>Invalid UUID</h1>	
		)
	};

	const passwordEntry = await getPasswordByUUID(uuid);
	if (!passwordEntry.success) {
		return <h1>Failed while reading the password entry</h1>
	};

	const data = passwordEntry.data;

	const password = Array.isArray(data) ? data[0] : data;
	if (!password) {
		return <h1>Password not found</h1>
	};


	return (
		<main>
			<h1>Hello to view password</h1>
			<section>
				<p>Name: { password.name }</p>	
				<PasswordField password={password.password}></PasswordField>
				<p>URL: { password.url }</p>	
			</section>
		</main>
	);

};
