import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import AddPasswordForm from "@/components/AddPasswordForm";
import overallStyles from "@/app/styles/overallStyles.module.css";

export const metadata: Metadata = {
	title: 'Add password',
	description: 'Add a new password entry to securely store your credentials.',
}

export default async function AddPassword() {
	"use server";
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
				<h1 className={overallStyles.pageTitle}>Add a new password</h1>
			</header>
			<main className={overallStyles.page}>
				<div className={overallStyles.formDiv}>
					<AddPasswordForm></AddPasswordForm>
				</div>
			</main>
		</div>
	);
};
