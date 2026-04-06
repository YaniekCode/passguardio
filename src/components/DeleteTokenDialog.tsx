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

"use client";

import DeleteDialog from "@/components/DeleteDialog";
import { useDeleteToken } from "@/hooks/useDeleteToken";

export default function DeleteTokenDialog({ token }: { token: string }) {
	const { isDialogOpen, setIsDialogOpen, formAction, pending } = useDeleteToken(token);

	return (
		<DeleteDialog
			title="Are you absolutely sure you want to delete the token?"
			description="This will permanently delete this token. This action cannot be undone."
			confirmText="Delete Token"
			triggerLabel="Delete Token"
			formAction={formAction}
			pending={pending}
			isDialogOpen={isDialogOpen}
			setIsDialogOpen={setIsDialogOpen}
		/>
	);
}
