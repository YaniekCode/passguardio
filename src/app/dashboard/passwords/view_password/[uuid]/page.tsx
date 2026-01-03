import type { Metadata } from "next";
import { validate as uuidValidate } from "uuid";
import Link from "next/link";
import Image from "next/image";

import overallStyles from "@/app/styles/overallStyles.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import getPasswordByUUID from "@/api/db/getPasswordByUUID";
import PasswordField from "@/components/PasswordField";

interface PageProps {
	params: {
		uuid: string;	
	};
};

export const metadata: Metadata = {
	title: 'View password',
	description: 'View your password entry and securely access your stored credentials.',
}

export default async function ViewPassword({ params }: PageProps) {
	"use server";
	const { uuid } = await params;
	const isValidUUID = uuidValidate(uuid);
	
	if (!isValidUUID) {
		return (
			<h1>Invalid password UUID</h1>	
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
				<Link href="/dashboard" aria-label="Go back to dashboard">
					<Image
						src="/icons/arrow-left-solid-full.svg"
						alt=""
						aria-hidden="true"
						width={25}
						height={25}
					/>
				</Link>
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
