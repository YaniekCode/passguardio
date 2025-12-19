"use server";

import overallStyles from "@/app/styles/overallStyles.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import iconStyles from "@/app/styles/iconStyles.module.css";
import getPasswordByUUID from "@/api/db/getPasswordByUUID";
import PasswordField from "@/components/PasswordField";

import { FaArrowLeft } from "react-icons/fa6";
import { validate as uuidValidate } from "uuid";
import Link from "next/link";

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
		<div>
			<header className={overallStyles.topBar}>
				<Link href="/dashboard"><FaArrowLeft className={iconStyles.leftArrowIcon}/></Link>
				<h1 className={overallStyles.pageTitle}>View password entry for { password.name }</h1>
			</header>
			<main className={overallStyles.page}>
				<dl className={variousStyles.descriptionList}>
					<dt>Name: </dt>	
					<dd>{ password.name }</dd>
					<dt>Password: </dt>
					<PasswordField password={password.password}></PasswordField>
					<dt>URL: </dt>
					<dd>{ password.url }</dd>
				</dl>
			</main>
		</div>
	);

};
