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

import React from "react";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogFooter,
} from "@/components/ui/dialog";

type DeleteDialogProps = {
	title: string;
	description: React.ReactNode;
	confirmText: string;
	triggerLabel: string;
	formAction: (formData: FormData) => void;
	pending: boolean;
	isDialogOpen: boolean;
	setIsDialogOpen: (open: boolean) => void;
};

export default function DeleteDialog({
	title,
	description,
	confirmText,
	triggerLabel,
	formAction,
	pending,
	isDialogOpen,
	setIsDialogOpen,
}: DeleteDialogProps) {
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button
					title={triggerLabel}
					variant="ghost"
					size="icon"
					aria-label={triggerLabel}
					onClick={() => setIsDialogOpen(true)}
				>
					<Trash />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<form action={formAction}>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>

						<Button
							type="submit"
							variant="destructive"
							disabled={pending}
							aria-disabled={pending}
						>
							{confirmText}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
