"use server";

import getPasswordByUUID from "@/api/db/getPasswordByUUID";
import { validate as uuidValidate } from "uuid";

// todo Fix not working params

interface PageProps {
	params: {
		uuid: string;	
	};
};

export default async function EditPassword({ params } : PageProps ) {
	const { uuid } = await params;
	const isValidUUID = uuidValidate(uuid);
	
	if (!isValidUUID) {
		return (
			<h1>Invalid UUID</h1>	
		)
	};

	const passwordEntry = await getPasswordByUUID(uuid);
	const data = passwordEntry.data;

	if (!passwordEntry.success) {
		return <h1>Failed reading the password entry</h1>
	};

	const password = Array.isArray(data) ? data[0] : data;

	if (!password) {
		return <h1>Password not found</h1>
	};


    	return (
		<main>
        		<h1>Password entry for { password.name } </h1>
			<form>
				<label htmlFor="name">Name</label>	
				<input type="text" name="name"></input>
				<br />
				<label htmlFor="password">Password</label>	
				<input type="password" name="password"></input>
				<br />
				<label htmlFor="url">URL</label>	
				<input type="text" name="url"></input>
				<br />
				<button>Save</button>
			</form>
		</main>
    	)

}
