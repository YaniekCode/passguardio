'use client';

import { useState, useEffect, useTransition } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { type MessageResultType } from '@/types';
import { deleteTokenAction } from '@/actions/deleteTokenAction';

const initialState: MessageResultType = { success: false, error: "" };

export function useDeleteToken(token: string) {
	const router = useRouter();
	const [, startTransition] = useTransition();

	const deletePasswordWithUUIDAction = deleteTokenAction.bind(null, token);

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