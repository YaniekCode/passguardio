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
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';

import { ActivationUserInputForm } from '@/components/accountActivation/ActivationUserInputForm';
import { type ActivateTokenState } from '@/types/activate';
import { tokenValidateAction } from '@/actions/accountActivation/tokenValidateAction';
import FormMessageBox from '@/components/FormMessageBox';

const initialState: ActivateTokenState = { success: false, not_found: false };

export function ActivationTokenInputForm() {
    const [state, formAction, pending] = useActionState(tokenValidateAction, initialState);

    return (
        <>
        { state.success ? (
            <ActivationUserInputForm token={state.data.token} role={state.data.role}/>
        ) :  (
			<form action={formAction} className="flex flex-col gap-5">
			<small>Fields marked with * are required</small>
                <div>
				    <Label htmlFor="token" className="my-2">
						Activation token <span aria-hidden="true">*</span>
						<span className="sr-only">(required)</span>	
					</Label>
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
							<FormMessageBox message={state.formError ?? state.error ?? ""}/>
						)}
					</div>
                </div>
				<Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>Next</Button>
			</form>
        )}
        </>
    )
}