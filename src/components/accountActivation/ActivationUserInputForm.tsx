'use client';

import { useEffect, useActionState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { ActivateUserState } from '@/types/activate';
import { activateUserAction } from '@/actions/accountActivation/activateUserAction';

const initialState: ActivateUserState = { success: false };

export function ActivationUserInputForm({ token, role }: { token: string, role: "user" | "admin" }) {
    const activateUserWithRoleAndTokenAction = activateUserAction.bind(null, token, role);

    const [state, formAction, pending] = useActionState(activateUserWithRoleAndTokenAction, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Account activated successfully", { position: "bottom-right"} );
		}
	}, [state.success])

    return (
        <form action={formAction} className="border-1 border-solid w-100 rounded-lg p-10 mt-10 flex flex-col gap-5">
                <div>
				    <Label htmlFor="username" className="mb-1">Full Name</Label>
                    <Input type="text" name="username" id="username" placeholder="John Smith"/>
                    <div id="username-error" aria-live="polite" aria-atomic="true">
						{!state.success && state.formErrors?.username && (
  							<p className="text-sm text-red-500">
    								{state.formErrors.username}
  							</p>
						)}
				    </div>
                </div>
                <div>
				    <Label htmlFor="email" className="mb-1">Email</Label>
                    <Input type="email" name="email" id="email" />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
						{!state.success && state.formErrors?.email && (
  							<p className="text-sm text-red-500">
    								{state.formErrors.email}
  							</p>
						)}
				    </div>
                </div>
                <div>
				    <Label htmlFor="password" className="mb-1">Password</Label>
                    <Input type="password" name="password" id="password" />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
						{!state.success && state.formErrors?.password && (
  							<p className="text-sm text-red-500">
    								{state.formErrors.password}
  							</p>
						)}
				    </div>
                </div>
				<div id="error" aria-live="polite" aria-atomic="true">
						{!state.success && state.error && (
  							<p className="text-sm text-red-500">
    								{state.error}
  							</p>
						)}
				</div>
				<Button type="submit" className="w-full mt-5" disabled={pending} aria-disabled={pending}>Activate Account</Button>
			</form>

    )
}