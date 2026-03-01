'use client';

import { useState, useEffect, useTransition } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { type MessageResultType } from '@/types';
import { deletePasswordAction } from '@/actions/deletePasswordAction';

const initialState: MessageResultType = { success: false, error: "" };

export function useDeletePassword(passwordUUID: string) {
	const router = useRouter();
	const [, startTransition] = useTransition();

	const deletePasswordWithUUIDAction = deletePasswordAction.bind(null, passwordUUID);

	const [state, formAction, pending] = useActionState(deletePasswordWithUUIDAction, initialState)
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!state.success && state.error) {
			toast.error(state.error, { position: "bottom-right" });
		} 

		if (state.success && state.message) {
			toast.success(state.message, { position: "bottom-right" });
			startTransition(() => {
				setIsDialogOpen(false);
				router.refresh();
			})
		} 


	}, [state, router, startTransition])

    return { isDialogOpen, setIsDialogOpen, formAction, pending };
}