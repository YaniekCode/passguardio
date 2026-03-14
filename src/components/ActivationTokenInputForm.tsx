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

import { ActivationUserInputForm } from './ActivationUserInputForm';
import { activateTokenAction, type State } from '@/actions/activateTokenAction';

const initialState: State = { success: false, not_found: false };

export function ActivationTokenInputForm() {
    const [state, formAction, pending] = useActionState(activateTokenAction, initialState);

    return (
        <>
        { state.success ? (
            <ActivationUserInputForm role={state.data.role}/>
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
					    {!state.success && state.formError && (
  							    <p className="text-sm text-red-500">
    								    {state.formError}
  							    </p>
						    )}
				    </div>
                </div>
				<Button type="submit" className="w-full mt-5" aria-disabled={pending} disabled={pending}>Next</Button>
			</form>
        )}
        </>
    )
}