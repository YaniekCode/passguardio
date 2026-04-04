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

import { useState, useEffect, useTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import type { MessageResultType } from '@/types';
import { deleteTokenAction } from '@/actions/deleteTokenAction';

const initialState: MessageResultType = {
	success: false,
	error: ""
};

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