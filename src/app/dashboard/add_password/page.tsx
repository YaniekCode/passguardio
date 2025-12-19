"use server";

import AddPasswordForm from "@/components/AddPasswordForm";
import overallStyles from "@/app/styles/overallStyles.module.css";
import iconStyles from "@/app/styles/iconStyles.module.css";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default async function AddPassword() {
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
