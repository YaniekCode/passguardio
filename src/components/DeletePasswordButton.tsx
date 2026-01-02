"use client";

import styles from "@/app/dashboard/dashboard.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import overallStyles from "@/app/styles/overallStyles.module.css";
import deletePasswordAction from "@/actions/deletePasswordAction";
import { useState, useRef } from "react";
import Image from "next/image";

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
			<dialog ref={dialogRef} className={variousStyles.dialog} aria-labelledby="deleteDialogTitle" aria-describedby="deleteDialogDescription" aria-hidden={!dialogOpen}>
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
