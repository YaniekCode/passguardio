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

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import UserRoleBadge from "@/components/UserRoleBadge";

import type { UserView } from "@/types";

type Props = {
	users: UserView[];
};

export default function UsersTable({ users }: Props) {
	return (
		<section className="overflow-hidden rounded-md border">
			<Table>
				<TableCaption>A list of users</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Fullname</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user, index) => {
						return (
							<TableRow key={index}>
								<TableCell className="font-medium">{user.username}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<UserRoleBadge role={user.role} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</section>
	);
}
