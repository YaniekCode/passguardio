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
import { Shield, Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

import handleGetPasswords from '@/backend/password/handleGetPasswords';
import { handleFetchPasswordStats } from '@/backend/password/handleFetchPasswordStats';
import { PasswordsTable } from '@/components/PasswordsTable';
import { PasswordData } from '@/types';
import { PasswordStatCard } from '@/components/PasswordStatCard';
import { AddPasswordDialog } from '@/components/addPassword/AddPasswordDialog';


export const metadata: Metadata = {
	title: "Dashboard",
	description: "Manage your passwords securely and locally from your Passguardio dashboard.",
};

export default async function Dashboard() {
	"use server";
	const getPasswordsResult = await handleGetPasswords();

	let userPasswords: PasswordData[] = [];
	if (getPasswordsResult?.success) {
		userPasswords = getPasswordsResult.data;
	}

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
			<InputGroup className="bg-zinc-800 border-none py-5">
				<InputGroupInput className="placeholder:text-neutral-200" placeholder="Search passwords, websites, or usernames"/>
				<InputGroupAddon>
					<Search />	
				</InputGroupAddon>
			</InputGroup>
			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<PasswordStatCard title="Total Password" counter={totalPasswordCount} icon="key"/>
				<PasswordStatCard title="Strong Passwords" counter={strongPasswordCount} icon="shield"/>
				<PasswordStatCard title="Weak Passwords" counter={weakPasswordCount} icon="danger"/>
				<PasswordStatCard title="Recently Added" counter={recentlyAddedPasswordCount} icon="trend"/>
			</section>
			<section>
			<h2 className="text-xl font-[500]">All Passwords</h2>
				{ /*getPasswordsResult?.success && (
					<PasswordSection userPasswords={userPasswords}></PasswordSection>
				)*/}
				<PasswordsTable passwords={userPasswords}></PasswordsTable>
			</section>
		</main>
	);
};
