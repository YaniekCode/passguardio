"use client";

import styles from "@/app/dashboard/dashboard.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import overallStyles from "@/app/styles/overallStyles.module.css";
import deletePasswordAction from "@/actions/deletePasswordAction";
import { useRef } from "react";
import { FaTrash } from "react-icons/fa6";

export default function DeletePasswordButton({ name, uuid }: { name: string, uuid: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null);


	function showDialog() {
		dialogRef.current?.showModal();
	};

	function hideDialog() {
		dialogRef.current?.close();
	};

	return (
		<>
			<div className={styles.action} onClick={showDialog}>
				<FaTrash className={styles.actionIcon}/>	
				<small className={styles.actionLabel}>Delete</small>
			</div>
			<dialog ref={dialogRef} className={variousStyles.dialog}>
				<h2>Delete password?</h2>
				<p>Are you sure you want to delete password entry for { name }? Doing so will remove it permanently.</p>
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
