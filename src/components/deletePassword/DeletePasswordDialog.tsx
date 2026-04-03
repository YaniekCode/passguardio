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

import DeleteDialog from '@/components/DeleteDialog';
import { useDeletePassword } from '@/hooks/useDeletePassword';

export default function DeletePasswordDialog({
	uuid,
	websiteName
} : {
	uuid: string,
	websiteName: string
}) {
	const { isDialogOpen, setIsDialogOpen, formAction, pending } = useDeletePassword(uuid);

	return (
		<DeleteDialog 
			title="Are you absolutely sure you want to delete the password?"	
			description={
				<>
					This will permanently delete the password for <b>{websiteName}</b>. This action cannot be undone.
				</>
			}
			confirmText="Delete Password"
			triggerLabel="Delete Password"
			formAction={formAction}
			pending={pending}
			isDialogOpen={isDialogOpen}
			setIsDialogOpen={setIsDialogOpen}
		/>
	);
};
