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
	TableRow
} from '@/components/ui/table';

import type { TokenDatabaseRecordType } from '@/types';
import UserRoleBadge from '@/components/UserRoleBadge';
import DeleteTokenDialog from '@/components/DeleteTokenDialog';
import { firaCode } from '@/app/fonts';

type Props = {
    tokens: TokenDatabaseRecordType[];
}

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

export default function TokensTable({ tokens }: Props) {
    return (
		<section className="overflow-hidden rounded-md border">
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
					{tokens.map((token) => {
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
		</section>
    )
}