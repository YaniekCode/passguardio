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

import type { Metadata } from 'next';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardPasswordStats from '@/components/dashboard/DashboardPasswordStats';
import DashboardPasswords from '@/components/dashboard/DashboardPasswords';

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Manage your passwords securely and locally from your Passguardio dashboard.",
};

export default async function Dashboard(props: {
		searchParams?: Promise<{
			query?: string;
			page?: string;			
		}>;
	}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	
	return (
		<main className="mt-5">
			<DashboardHeader />
			<Suspense fallback={<Skeleton count={6}/>}>
				<DashboardPasswordStats />
			</Suspense>
			<DashboardPasswords query={query} currentPage={currentPage}/>
		</main>
	);
};
