/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2025 YaniekCode
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

import type { Metadata } from 'next';
import { User } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';

import { firaCode } from '@/app/fonts';
import { fetchTokens } from '@/backend/db/fetchTokens';
import { UserRoleBadge } from '@/components/UserRoleBadge';
import { AddUserDialog } from '@/components/addUser/AddUserDialog';
import { DeleteTokenDialog } from '@/components/DeleteTokenDialog';


export const metadata: Metadata = {
	title: "Users",
	description: "Manage users of your PassGuardio instance from the users panel.",
};

function formatDate(ms: number) {
	const date = new Date(ms);

	const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
	const day = date.getDate();
	const month = date.toLocaleDateString('en-US', { month: 'long' });
	const year = date.getFullYear();

	const time = date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

  return `${weekday} ${day} ${month} ${year} | ${time}`;
}

export default async function Dashboard() {
	const tokens = await fetchTokens();
	return (
		<main>
			<header className="flex items-center justify-between">
				<div className="flex items-center gap-5">
					<User size="30"/>
					<div>
						<h1 className="text-3xl font-semibold">Users Panel</h1>
						<h2 className="text-muted-foreground">Manage users of your PassGuardio instance</h2>
					</div>
				</div>
				<AddUserDialog />
			</header>
			{tokens.success ? (
				tokens.data.length === 0 ? (
					<p>No tokens found</p>
				) : (
			<Table>
				<TableCaption>A list of tokens</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Token</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Expires at</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tokens.data.map((token) => {
						const formattedToken = token.token && token.token.replace(/(\d{3})(\d{3})/, "$1-$2");
						return (
							<TableRow key={token.token}>
								<TableCell className={`${firaCode.className} font-[500]`}>{formattedToken}</TableCell>
								<TableCell>
									<UserRoleBadge role={token.role}/>
								</TableCell>
								<TableCell>{formatDate(token.expires_at)}</TableCell>
								<TableCell>
									<DeleteTokenDialog token={token.token}/>
								</TableCell>
							</TableRow>
						)

					})}
				</TableBody>
			</Table>
			)) : <p>Something went wrong</p>}
		</main>
	);
};
