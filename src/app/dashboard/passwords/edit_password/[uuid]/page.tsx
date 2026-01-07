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
import { validate as uuidValidate } from "uuid";
import Image from "next/image";

import getPasswordByUUID from "@/api/db/getPasswordByUUID";
import editPasswordAction from "@/actions/editPasswordAction";
import formStyles from "@/app/styles/formStyles.module.css";
import overallStyles from "@/app/styles/overallStyles.module.css";

interface PageProps {
	params: {
		uuid: string;	
	};
};

export const metadata: Metadata = {
	title: 'Edit password',
	description: 'Update an existing password entry while keeping your credentials secure.',
}

export default async function EditPassword({ params } : PageProps ) {
	"use server";
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
				<Link href="/dashboard" aria-label="Go back to dashboard">
					<Image
						src="/icons/arrow-left-solid-full.svg"
						alt=""
						aria-hidden="true"
						width={25}
						height={25}
					/>
				</Link>
				<h1 className={overallStyles.pageTitle}>Edit password entry for { password.name }</h1>
			</header>
			<main className={overallStyles.page}>
				<form action={editPasswordAction} className={formStyles.form}>
					<div className={formStyles.formInputGroup}>
						<label htmlFor="passwordNameInput">Name</label><br />
						<input id="passwordNameInput" type="text" name="name" defaultValue={password.name}></input>
					</div>
					<input type="hidden" name="uuid" value={uuid}></input>
					<div className={formStyles.formInputGroup}>
						<label htmlFor="passwordInput">Password</label><br />
						<input id="passwordInput" type="password" name="password" defaultValue={password.password}></input>
					</div>
					<div className={formStyles.formInputGroup}>
						<label htmlFor="passwordUrlInput">URL</label><br />
						<input id="passwordUrlInput" type="text" name="url" defaultValue={password.url}></input>
					</div>
					<button className={formStyles.submit}>Save</button>
				</form>
			</main>
		</div>
    	)

}
