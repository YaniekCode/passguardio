/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2026 YaniekCode
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

'use client';

import { useActionState } from 'react'; 
import { startTransition} from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { loginAction } from '@/actions/login/loginAction';
import { FormState } from '@/types';
import FormMessageBox from '@/components/FormMessageBox';

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState<FormState, FormData>(loginAction, { success: true, message: "" });

	// function responsible for not clearing form fields afrer form submition and sending FormData
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
    			formAction(formData);
  		});
	};

	return (
      	<form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="on"> 
			<small>Fields marked with * are required</small>
			<div>
				<Label className="my-2" htmlFor="emailInput">
					Email <span aria-hidden="true">*</span>
					<span className="sr-only">(required)</span>
				</Label>
				<Input type="email" id="emailInput" name="email" placeholder="Enter your email" autoComplete="email" required></Input>
			</div>
			<div>
				<Label className="my-2" htmlFor="passwordInput">
					Password <span aria-hidden="true">*</span>
					<span className="sr-only">(required)</span>
				</Label>
				<Input type="password" id="passwordInput" name="password" placeholder="Enter your password" autoComplete="current-password" required></Input>
			</div>
			{ !state.success && state.error &&
				<FormMessageBox message={state.error}/>
			}
			<Button className="w-full" disabled={isPending} aria-disabled={isPending}>Login</Button>
		</form>
	);
};
