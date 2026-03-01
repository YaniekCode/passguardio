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

import { useActionState } from "react"; 
import { startTransition} from "react";
import Link from "next/link";

import signup from "@/actions/signup/signup";
import { FormState } from "@/types";
import FormMessageBox from "@/components/FormMessageBox";

export default function SignupForm() {
	const [state, formAction, isPending] = useActionState<FormState, FormData>(signup, { success: true, message: "", error: "" });

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) { // responsible for not clearing form fields afrer form submition
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
    			formAction(formData);
  		});
	};

	return (
		<form onSubmit={handleSubmit}> 
			<div>
				<label htmlFor="usernameInput" >Full Name<span aria-hidden="true">*</span></label><br />
				<input id="usernameInput" type="text" name="username" minLength={3} maxLength={50} required></input><br />
			</div>
			<div>
				<label htmlFor="emailInput">Email<span aria-hidden="true">*</span></label><br />
				<input id="emailInput" type="email" name="email"></input><br />
			</div>
			<div>
				<label htmlFor="passwordInput">Password<span aria-hidden="true">*</span></label><br />
				<input id="passwordInput" type="password" name="password" minLength={8} required></input><br />
			</div>
			<small>* required fields</small><br />
			<div>
				<Link href="/login">Already have an account? Log in here.</Link>
			</div>
			{ state.error && <FormMessageBox message={state.error}/> }
			<button disabled={isPending}>Sign up</button>
		</form>
	);
};
