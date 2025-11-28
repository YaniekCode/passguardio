"use client";

import { useState, useEffect } from "react";
import { getSession } from "@/utils/session/sessionUtils";
import handleGetPasswords from "@/api/password/handleGetPasswords";
import { PasswordDatabaseRecord } from "@/lib";
import styles from "@/app/dashboard/dashboard.module.css";
import Link from "next/link";

export default function Dashboard() {
	const [passwords, setPasswords] = useState<PasswordDatabaseRecord[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	//const session = await getSession();

	//const firstUsernameLetter = session.username[0].toUpperCase();
	
	useEffect(() => {
		async function load() {
			const res = await handleGetPasswords();

			if (res.success) {
				setPasswords(res.data);
			} else {
				setError(res.error);
			};

			setLoading(false);
		}

		load();
	}, []);


	return (
		<div className={styles.page}>
			<section className={styles.topBar}>
				<div>
      					<h1 className={styles.pageTitle}>Dashboard</h1>
				</div>
				<div className={styles.userIcon}>
				{/*<p>{firstUsernameLetter}</p>*/}	
				</div>
			</section>
      			<main className={styles.main}>
				<section className={styles.mainBar}>
					<h2 className={styles.pageSubtitle}>My passwords: </h2>
					<Link href="/dashboard/add_password">Add a password</Link>
				</section>
				<section>
				</section>
      			</main>
    		</div>
	);
};
