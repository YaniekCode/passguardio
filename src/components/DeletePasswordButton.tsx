"use client";

import styles from "@/app/dashboard/dashboard.module.css";
import deletePasswordAction from "@/actions/deletePasswordAction";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function DeletePasswordButton({ name, uuid }: { name: string, uuid: string }) {
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);

	function showDialog() {
		setDialogVisible(true);
	};

	function hideDialog() {
		setDialogVisible(false);
	};

	return (
		<>
			<div onClick={showDialog}>
				<FaTrash className={styles.actionIcon}/>	
				<small className={styles.actionLabel}>Delete</small>
			</div>
				<dialog open={dialogVisible} className={styles.deletePasswordDialog}>
					<p>Are you sure you want to delete password entry for { name }? Doing so will remove it permanently.</p>
					<button onClick={hideDialog}>Close</button>
					<form action={deletePasswordAction}>
						<input type="hidden" name="uuid" value={uuid}></input>
						<button onClick={hideDialog}>Delete</button>
					</form>
				</dialog>
		</>
	);
};
