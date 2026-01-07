/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2025 YaniekCode
 *
 * This file is part of PassGuardio.
 *
 * PassGuardio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PassGuardio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PassGuardio.  If not, see <https://www.gnu.org/licenses/>.
*/

import type { Metadata } from "next";
import Link from "next/link";

import { getSession } from "@/utils/session/sessionUtils";
import handleGetPasswords from "@/api/password/handleGetPasswords";
import PasswordSection from "@/components/PasswordsSection";
import { PasswordData } from "@/lib";
import overallStyles from "@/app/styles/overallStyles.module.css";
import styles from "@/app/dashboard/dashboard.module.css";


export const metadata: Metadata = {
	title: "Dashboard",
	description: "Manage your passwords securely and locally from your Passguardio dashboard.",
};

export default async function Dashboard() {
	"use server";
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
				<div aria-hidden="true" className={styles.userAvatar}>
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
