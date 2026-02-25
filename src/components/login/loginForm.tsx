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

import login from "@/actions/login/login";
import { FormState } from "@/lib";
import FormMessageBox from "@/components/FormMessageBox";

export default function SignupForm() {
	const [state, formAction, isPending] = useActionState<FormState, FormData>(login, { success: true, message: "", error: "" });

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
				<label htmlFor="emailInput">Email<span aria-hidden="true">*</span></label><br />
				<input id="emailInput" type="email" name="email" autoComplete="email"></input><br />
			</div>
			<div>
				<label htmlFor="passwordInput">Password<span aria-hidden="true">*</span></label><br />
				<input id="passwordInput" type="password" name="password" minLength={8} required autoComplete="current-password"></input>
			</div>
			<small>* required fields</small>
			<div>
				<Link href="/">Don&apos;t have an account yet? Create one here.</Link>
			</div>
			{ state.error && <FormMessageBox message={state.error}/> }
			<button disabled={isPending}>Login</button>
		</form>
	);
};
