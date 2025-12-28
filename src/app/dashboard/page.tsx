"use server";

import { getSession } from "@/utils/session/sessionUtils";
import handleGetPasswords from "@/api/password/handleGetPasswords";
import PasswordSection from "@/components/PasswordsSection";
import { PasswordData } from "@/lib";
import overallStyles from "@/app/styles/overallStyles.module.css";
import styles from "@/app/dashboard/dashboard.module.css";
import Link from "next/link";

export default async function Dashboard() {

	const session = await getSession();
	const firstUsernameLetter = session.username[0].toUpperCase();

	const getPasswordsResult = await handleGetPasswords();

	let userPasswords: PasswordData[] = [];
	if (getPasswordsResult.success) {
		userPasswords = getPasswordsResult.data;
	}


	return (
		<div className={styles.page}>
			<section className={styles.topBar}>
				<div>
      					<h1 className={overallStyles.pageTitle}>Dashboard</h1>
				</div>
				<div className={styles.userAvatar}>
				<p>{firstUsernameLetter}</p>
				</div>
			</section>
      			<main className={styles.main}>
				<section className={styles.mainBar}>
					<h2 className={styles.pageSubtitle}>My passwords: </h2>
					<Link href="/dashboard/add_password"><button className={styles.addPasswordButton}>Add a new password</button></Link>
				</section>
				{ getPasswordsResult.success && (
					<PasswordSection userPasswords={userPasswords}></PasswordSection>
				)}
      			</main>
    		</div>
	);
};
