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

"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import styles from "@/app/dashboard/dashboard.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import overallStyles from "@/app/styles/overallStyles.module.css";
import deletePasswordAction from "@/actions/deletePasswordAction";

export default function DeletePasswordButton({ name, uuid }: { name: string, uuid: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	function showDialog() {
		setDialogOpen(true);
		dialogRef.current?.showModal();
	};

	function hideDialog() {
		setDialogOpen(false);
		dialogRef.current?.close();
	};

	return (
		<>
			<button className={styles.action} onClick={showDialog} aria-haspopup="dialog" aria-expanded={dialogOpen} aria-label={`Delete password entry for ${name}`}>
				<Image
					src="/icons/trash-solid-full.svg"
					alt="Delete password icon"
					aria-hidden="true"
					width={25}
					height={25}
				/>
				<span className={styles.actionLabel}>Delete</span>
			</button>
			<dialog ref={dialogRef} className={variousStyles.dialog} aria-labelledby="deleteDialogTitle" aria-describedby="deleteDialogDescription">
				<h2 id="deleteDialogTitle">Delete password?</h2>
				<p id="deleteDialogDescription">Are you sure you want to delete password entry for { name }? Doing so will remove it permanently.</p>
				<section className={variousStyles.buttonGroup}>
				<button onClick={hideDialog} className={overallStyles.btnCancel}>Close</button>
				<form action={deletePasswordAction}>
					<input type="hidden" name="uuid" value={uuid}></input>
					<button type="submit" className={overallStyles.btnDanger}>Delete</button>
				</form>
				</section>
			</dialog>
		</>
	);
};
