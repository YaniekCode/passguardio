"use client";

import styles from "@/app/dashboard/dashboard.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";
import { useState } from "react";
import Image from "next/image";

export default function PasswordField({ password }: { password: string }) {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);	

	function changePasswordVisibility() {
		setPasswordVisible(!passwordVisible);
	};

	return (
		<dd className={styles.passwordDiv}>
			{ passwordVisible
				? <p className={variousStyles.descriptionListPassword}>{ password }</p>
				: ( <p className={variousStyles.descriptionListPassword}>
					<span aria-hidden="true">{ "*".repeat(password.length) }</span>
					<span className={variousStyles.srOnly}>Password hidden</span>
				    </p> )
			}
			<button onClick={changePasswordVisibility} aria-label={passwordVisible ? "Hide password" : "Show password"} aria-pressed={passwordVisible}>
				<Image
					src="/icons/eye-solid-full.svg"
					alt=""
					width={25}
					height={25}
				/>
			</button>
		</dd>

	);
};
