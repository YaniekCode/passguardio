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

import overallStyles from "@/app/styles/overallStyles.module.css";
import SignupForm from "@/components/signup/signupForm";

export const metadata: Metadata = {
	title: 'Sign up',
	description: 'Get started with Passguardio and set up your secure, local password manager.',
};

export default function SignupPage() {
	return (
		<div className={overallStyles.page}>
      			<main className={overallStyles.main}>
      				<h1 className={`${overallStyles.pageTitle}`}>Sign up</h1>
				<SignupForm />
      			</main>
    		</div>
	);
}
