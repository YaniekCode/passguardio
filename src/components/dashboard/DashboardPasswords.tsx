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

import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

import {
	Card,
	CardHeader,
	CardContent }
from "@/components/ui/card";
import { PasswordsTable } from '@/components/PasswordsTable';

export default function DashboardPasswords({ query, currentPage }: { query: string, currentPage: number }) {
    return (
        <section className="my-5">
			<Card className="border-[1.5] border-solid shadow-none">
				<CardHeader className="text-xl font-[500]">All Passwords</CardHeader>
				<CardContent>
					<Suspense key={query + currentPage} fallback={<Skeleton count={10} />}>
						<PasswordsTable query={query} currentPage={currentPage} />
					</Suspense>
				</CardContent>
			</Card>
		</section>
    )
}