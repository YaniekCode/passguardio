"use client";

import styles from "@/app/dashboard/dashboard.module.css";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";

export default function PasswordField({ password }: { password: string }) {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);	

	function changePasswordVisibility() {
		setPasswordVisible(!passwordVisible);
	};

	return (
		<div className={styles.passwordDiv}>
			{ passwordVisible
				? <p>Password: { password }</p>
				: <p>Password: { "*".repeat(password.length) }</p>
			}
			<FaRegEye className={styles.passwordVisibilityIcon} onClick={changePasswordVisibility}/>
		</div>

	);
};
