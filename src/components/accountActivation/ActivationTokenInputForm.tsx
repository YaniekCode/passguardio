'use client';

import { useActionState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";

import { ActivationUserInputForm } from '@/components/accountActivation/ActivationUserInputForm';
import { type ActivateTokenState } from '@/types/activate';
import { activateTokenAction } from '@/actions/accountActivation/activateTokenAction';

const initialState: ActivateTokenState = { success: false, not_found: false };

export function ActivationTokenInputForm() {
    const [state, formAction, pending] = useActionState(activateTokenAction, initialState);

    return (
        <>
        { state.success ? (
            <ActivationUserInputForm token={state.data.token} role={state.data.role}/>
        ) :  (
			<form action={formAction} className="border-1 border-solid rounded-lg p-10 mt-10 flex flex-col gap-5">
                <div>
				    <Label htmlFor="token" className="mb-1">Activation token</Label>
				    <InputOTP id="token" name="token" maxLength={6} required> 
					    <InputOTPGroup>
						    <InputOTPSlot index={0} />	
						    <InputOTPSlot index={1} />	
						    <InputOTPSlot index={2} />	
					    </InputOTPGroup>
					    <InputOTPSeparator />
					    <InputOTPGroup>
						    <InputOTPSlot index={3} />	
						    <InputOTPSlot index={4} />	
						    <InputOTPSlot index={5} />	
					    </InputOTPGroup>
				    </InputOTP>
					<div id="token-error" aria-live="polite" aria-atomic="true">
						{!state.success && (state.formError || state.error) && (
							<p className="text-sm text-red-500">
								{state.formError ?? state.error}
							</p>
						)}

					</div>
                </div>
				<Button type="submit" className="w-full mt-5" disabled={pending} aria-disabled={pending}>Next</Button>
			</form>
        )}
        </>
    )
}