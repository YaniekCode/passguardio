import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import AddPasswordForm from "@/components/AddPasswordForm";
import overallStyles from "@/app/styles/overallStyles.module.css";
import iconStyles from "@/app/styles/iconStyles.module.css";

export const metadata: Metadata = {
	title: 'Add password',
	description: 'Add a new password entry to securely store your credentials.',
}

export default async function AddPassword() {
	"use server";
	return ( 
		<div>
			<header className={overallStyles.topBar}>
				<Link href="/dashboard"><FaArrowLeft className={iconStyles.leftArrowIcon}/></Link>
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
