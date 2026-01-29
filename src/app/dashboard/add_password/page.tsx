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
import Image from "next/image";

import AddPasswordForm from "@/components/addPassword/AddPasswordForm";
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
