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

import { useEffect, useActionState } from 'react';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { ActivateUserState } from '@/types/activate';
import { activateUserAction } from '@/actions/accountActivation/activateUserAction';
import FormMessageBox from '@/components/FormMessageBox';

const initialState: ActivateUserState = { success: false };

export default function ActivationUserInputForm({ token, role }: { token: string, role: "user" | "admin" }) {
    const activateUserWithRoleAndTokenAction = activateUserAction.bind(null, token, role);

    const [state, formAction, pending] = useActionState(activateUserWithRoleAndTokenAction, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Account activated successfully", { position: "bottom-right"} );
		}
	}, [state.success])

    return (
        <form action={formAction} className="flex flex-col gap-5" autoComplete="on">
			<small>Fields marked with * are required</small>
            <div>
				<Label htmlFor="username" className="my-2">
					Full Name <span aria-hidden="true">*</span>
					<span className="sr-only">(required)</span>
				</Label>
                <Input type="text" name="username" id="username" placeholder="Enter your full name" autoComplete="name" required/>
                <div id="username-error" aria-live="polite" aria-atomic="true">
					{!state.success && state.formErrors?.username && (
						<FormMessageBox message={state.formErrors.username} />
					)}
				</div>
            </div>
            <div>
				<Label htmlFor="email" className="my-2">
					Email <span aria-hidden="true">*</span>
					<span className="sr-only">(required)</span>
				</Label>
                <Input type="email" name="email" id="email" placeholder="Enter your email" autoComplete="email" required/>
                <div id="email-error" aria-live="polite" aria-atomic="true">
					{!state.success && state.formErrors?.email && (
						<FormMessageBox message={state.formErrors.email} />
					)}
				</div>
            </div>
            <div>
				<Label htmlFor="password" className="my-2">
					Password <span aria-hidden="true">*</span>
					<span className="sr-only">(required)</span>
				</Label>
                <Input type="password" name="password" id="password" placeholder="Create a password" autoComplete="new-password" required/>
                <div id="password-error" aria-live="polite" aria-atomic="true">
					{!state.success && state.formErrors?.password && (
						<FormMessageBox message={state.formErrors.password} />
					)}
				</div>
            </div>
			<Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>Activate Account</Button>
		</form>
    )
}