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

import { useState } from "react";
import Image from "next/image";

import styles from "@/app/dashboard/dashboard.module.css";
import variousStyles from "@/app/styles/variousStyles.module.css";

export default function ViewPasswordField({ password }: { password: string }) {
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
