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

import { CirclePlus } from "lucide-react";

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
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Label } from "@/components/ui/label";

import { useAddUser } from "@/hooks/useAddUser";
import { firaCode } from "@/app/fonts";
import Link from "next/link";

export default function AddUserDialog() {
	const { state, isDialogOpen, setIsDialogOpen, formAction, pending } = useAddUser();

	const generatedToken = state.success ? state.token : null;

	// Format the token to look like this 123-456
	const formattedToken = generatedToken && generatedToken.replace(/(\d{3})(\d{3})/, "$1-$2");

	// Copy the token without the hyphen
	function handleCopy(e: React.ClipboardEvent) {
		e.preventDefault();
		if (generatedToken) {
			e.clipboardData.setData("text/plain", generatedToken);
		}
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setIsDialogOpen(true)}>
					<CirclePlus />
					Add User
				</Button>
			</DialogTrigger>
			<DialogContent>
				{generatedToken == null ? (
					<form action={formAction} className="flex flex-col gap-4">
						<DialogHeader>
							<DialogTitle>Add New User</DialogTitle>
							<DialogDescription>
								Add a new user to your vault. All fields marked with * are required.
							</DialogDescription>
						</DialogHeader>
						<Label htmlFor="role">Role *</Label>
						<NativeSelect id="role" name="role">
							<NativeSelectOption value="user">User</NativeSelectOption>
							<NativeSelectOption value="admin">Admin</NativeSelectOption>
						</NativeSelect>
						<div id="role-error" aria-live="polite" aria-atomic="true">
							{!state.success && state.formErrors?.["role"] && (
								<p className="text-sm text-red-500">
									{state.formErrors["role"][0]}
								</p>
							)}
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button
								type="submit"
								variant="default"
								disabled={pending}
								aria-disabled={pending}
							>
								Add User
							</Button>
						</DialogFooter>
					</form>
				) : (
					<DialogHeader>
						<DialogTitle>Account activation token</DialogTitle>
						<DialogDescription>This token expires in 24 hours.</DialogDescription>
						<p className={`${firaCode.className} font-[600] text-center text-4xl my-5`}>
							<data value={generatedToken} onCopy={handleCopy}>
								{formattedToken}
							</data>
						</p>
						<p className="text-muted-foreground text-center">
							Use this token at{" "}
							<span className="text-sky-600">
								<Link href="/activate">http://IP:9820/activate</Link>
							</span>{" "}
							to register.
						</p>
					</DialogHeader>
				)}
			</DialogContent>
		</Dialog>
	);
}
