"use client";

import styles from "@/app/dashboard/dashboard.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";

export default function PasswordField({ password }: { password: string }) {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);	

	function changePasswordVisibility() {
		setPasswordVisible(!passwordVisible);
	};

	return (
		<dd className={styles.passwordDiv}>
			{ passwordVisible
				? <p className={variousStyles.descriptionListPassword}>{ password }</p>
				: <p className={variousStyles.descriptionListPassword}>{ "*".repeat(password.length) }</p>
			}
			<FaRegEye className={styles.passwordVisibilityIcon} onClick={changePasswordVisibility}/>
		</dd>

	);
};
