"use server";

import AddPasswordForm from "@/components/AddPasswordForm";
import styles from "@/app/dashboard/add_password/addPassword.module.css";
import iconStyles from "@/app/styles/iconStyles.module.css";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default async function AddPassword() {
	return (
		<div>
			<section className="topBar">
				<Link href="/dashboard"><FaArrowLeft className={iconStyles.leftArrowIcon}/></Link>
				<h1 className="pageTitle">Add a new password</h1>
			</section>
			<main>
				<div className={styles.formDiv}>
					<AddPasswordForm></AddPasswordForm>
				</div>
			</main>
		</div>
	);
};
