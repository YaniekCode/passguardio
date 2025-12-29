import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { validate as uuidValidate } from "uuid";

import getPasswordByUUID from "@/api/db/getPasswordByUUID";
import editPasswordAction from "@/actions/editPasswordAction";
import formStyles from "@/app/styles/formStyles.module.css";
import overallStyles from "@/app/styles/overallStyles.module.css";
import iconStyles from "@/app/styles/iconStyles.module.css";

interface PageProps {
	params: {
		uuid: string;	
	};
};

export const metadata: Metadata = {
	title: 'Edit password',
	description: 'Update an existing password entry while keeping your credentials secure.',
}

export default async function EditPassword({ params } : PageProps ) {
	"use server";
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
		<div>
			<header className={overallStyles.topBar}>
				<Link href="/dashboard"><FaArrowLeft className={iconStyles.leftArrowIcon}/></Link>
				<h1 className={overallStyles.pageTitle}>Edit password entry for { password.name }</h1>
			</header>
			<main className={overallStyles.page}>
				<form action={editPasswordAction} className={formStyles.form}>
					<div className={formStyles.formInputGroup}>
						<label htmlFor="name">Name</label><br />
						<input type="text" name="name" defaultValue={password.name}></input>
					</div>
					<input type="hidden" name="uuid" value={uuid}></input>
					<div className={formStyles.formInputGroup}>
						<label htmlFor="password">Password</label><br />
						<input type="password" name="password" defaultValue={password.password}></input>
					</div>
					<div className={formStyles.formInputGroup}>
						<label htmlFor="url">URL</label><br />
						<input type="text" name="url" defaultValue={password.url}></input>
					</div>
					<button className={formStyles.submit}>Save</button>
				</form>
			</main>
		</div>
    	)

}
