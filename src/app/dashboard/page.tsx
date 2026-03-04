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
import { Shield } from 'lucide-react';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

import { handleFetchPasswordStats } from '@/backend/password/handleFetchPasswordStats';
import { PasswordSearch } from '@/components/PasswordSearch';
import { PasswordsTable } from '@/components/PasswordsTable';
import { PasswordStatCard } from '@/components/PasswordStatCard';
import { AddPasswordDialog } from '@/components/addPassword/AddPasswordDialog';


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
	

	const fetchPasswordStatsResult = await handleFetchPasswordStats();
	if (!fetchPasswordStatsResult?.success) {
		// todo failed reading password stats
		return;
	}

	const { totalPasswordCount, strongPasswordCount, weakPasswordCount, recentlyAddedPasswordCount } = fetchPasswordStatsResult.data;

	return (
		<main>
			<header className="flex items-center justify-between">
				<div className="flex items-center gap-5">
					<Shield size="30"/>
					<div>
						<h1 className="text-3xl font-semibold">Password Vault</h1>
						<h2 className="text-muted-foreground">Manage your passwords securely</h2>
					</div>
				</div>
				<AddPasswordDialog />
			</header>
			<PasswordSearch placeholder="Search passwords..."/>
			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<PasswordStatCard title="Total Password" counter={totalPasswordCount} icon="key"/>
				<PasswordStatCard title="Strong Passwords" counter={strongPasswordCount} icon="shield"/>
				<PasswordStatCard title="Weak Passwords" counter={weakPasswordCount} icon="danger"/>
				<PasswordStatCard title="Recently Added" counter={recentlyAddedPasswordCount} icon="trend"/>
			</section>
			<section>
			<h2 className="text-xl font-[500]">All Passwords</h2>
				<Suspense key={query + currentPage} fallback={<Skeleton count={10} />}>
					<PasswordsTable query={query} currentPage={currentPage} />
				</Suspense>
			</section>
		</main>
	);
};
