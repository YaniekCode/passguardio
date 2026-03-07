'use client';

import { useState, useActionState } from 'react';

import { type State } from '@/actions/addUserAction';
import { addUserAction } from '@/actions/addUserAction';

const initialState: State = { success: false, formErrors: {}, error: "" };

export function useAddUser() {
	const [state, formAction, pending] = useActionState(addUserAction, initialState);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    return { state, isDialogOpen, setIsDialogOpen, formAction, pending };
}
