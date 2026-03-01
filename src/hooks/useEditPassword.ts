'use client';

import { useState, useEffect, useActionState } from 'react';
import { toast } from 'sonner';

import { type FormState } from '@/types';
import { editPasswordAction } from '@/actions/editPasswordAction';

const initialState: FormState = { success: false, formErrors: {}, error: "" };

export function useEditPassword(passwordUUID: string) {
    const editPasswordWithUUIDAction = editPasswordAction.bind(null, passwordUUID);

	const [state, formAction, pending] = useActionState(editPasswordWithUUIDAction, initialState);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!state.success && state.error) {
			toast.error(state.error, { position: "bottom-right" });
		} 

		if (state.success && state.message) {
			toast.success(state.message, { position: "bottom-right" });
		} 
	}, [state])

    return { state, isDialogOpen, setIsDialogOpen, formAction, pending };
}