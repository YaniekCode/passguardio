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

"use server";

import Link from "next/link";
import Image from "next/image";

import { PasswordData } from "@/lib";
import styles from "@/app/dashboard/dashboard.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import DeletePasswordButton from "@/components/DeletePasswordButton";

export default async function PasswordSection({ userPasswords } : { userPasswords: PasswordData[] }) {
	return (
		<section>
			<table className={variousStyles.table}>
				<thead>
					<tr role="row" className={variousStyles.tableRow}>
						<th role="columnheader" scope="col" className={variousStyles.tableHeader}>Name</th>
						<th role="columnheader" scope="col" className={variousStyles.tableHeader}>Password</th>
						<th role="columnheader" scope="col" className={variousStyles.tableHeader}>URL</th>
						<th role="columnheader" scope="col" className={variousStyles.tableHeader}>Actions</th>
					</tr>
				</thead>
				<tbody>
				{
					userPasswords.map((password) => (
						<tr role="row" key={password.uuid}>
							<td className={variousStyles.tableData}>{password.name}</td>
							<td className={variousStyles.tableData}>
								<span aria-hidden="true">{"*".repeat(password.password.length)}</span>
								<span className={variousStyles.srOnly}>Password hidden</span>
							</td>
							<td className={variousStyles.tableData}>{password.url}</td>
							<td className={variousStyles.tableData}>
								<div className={styles.actionsDiv}>
									<div className={styles.action}>
										<Link href={`/dashboard/passwords/edit_password/${password.uuid}`}>
											<Image
												src="/icons/pen-solid-full.svg"
												alt="Edit password icon"
												width={25}
												height={25}
											/>
											<small className={styles.actionLabel}>Edit</small>
										</Link>
									</div>
									<div className={styles.action}>
										<Link href={`/dashboard/passwords/view_password/${password.uuid}`}>
											<Image
												src="/icons/eye-solid-full.svg"
												alt="View password icon"
												width={25}
												height={25}
											/>
											<small className={styles.actionLabel}>View</small>
										</Link>
									</div>
									<div className={styles.action}>
										<DeletePasswordButton name={password.name} uuid={password.uuid} />
									</div>
								</div>
							</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</section>
    )
}
