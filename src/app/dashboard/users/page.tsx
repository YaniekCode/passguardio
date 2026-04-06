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

import type { Metadata } from "next";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import UsersTable from "@/components/UsersTable";
import TokensTable from "@/components/TokensTable";
import StatCard from "@/components/StatCard";
import RetryButton from "@/components/RetryButton";
import { fetchUsers } from "@/backend/db/fetchUsers";
import { fetchTokens } from "@/backend/db/fetchTokens";
import { handleFetchUserStats } from "@/backend/users/handleFetchUserStats";
import AddUserDialog from "@/components/addUser/AddUserDialog";

export const metadata: Metadata = {
	title: "Users",
	description: "Manage users of your PassGuardio instance from the users panel.",
};

export default async function Dashboard() {
	const users = await fetchUsers();
	const tokens = await fetchTokens();

	const fetchUsersStatsResult = await handleFetchUserStats();
	// Display an appropriate message if an error occured when fetching password statistics
	if (!fetchUsersStatsResult?.success) {
		return (
			<div className="flex items-center gap-3">
				<p className="text-lg">Password statistics could not be loaded</p>
				<RetryButton message="Try Again" />
			</div>
		);
	}

	const { totalUsersCount, totalPasswordsCount, strongPasswordsCount, weakPasswordsCount } =
		fetchUsersStatsResult.data;

	return (
		<main className="mt-5">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Users</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<header className="flex items-center justify-between">
				<div className="flex items-center gap-5">
					<div>
						<h1 className="text-3xl font-semibold">Users & Tokens</h1>
						<h2 className="text-muted-foreground">
							Manage users and tokens of your PassGuardio instance
						</h2>
					</div>
				</div>
				<AddUserDialog />
			</header>
			<section className="mt-10 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard title="Total Users" counter={totalUsersCount} icon="user" />
				<StatCard title="Total Passwords" counter={totalPasswordsCount} icon="purpleKey" />
				<StatCard title="Strong Passwords" counter={strongPasswordsCount} icon="shield" />
				<StatCard title="Weak Passwords" counter={weakPasswordsCount} icon="danger" />
			</section>
			<Tabs defaultValue="users">
				<TabsList>
					<TabsTrigger value="users">Users</TabsTrigger>
					<TabsTrigger value="tokens">Tokens</TabsTrigger>
				</TabsList>
				<TabsContent value="users">
					{users.success ? (
						users.data.length === 0 ? (
							<p>No users found</p>
						) : (
							<Card className="border-[1.5] border-solid shadow-none">
								<CardHeader className="text-xl font-[500]">Users</CardHeader>
								<CardContent>
									<UsersTable users={users.data} />
								</CardContent>
							</Card>
						)
					) : (
						<p>Something went wrong</p>
					)}
				</TabsContent>
				<TabsContent value="tokens">
					{tokens.success ? (
						tokens.data.length === 0 ? (
							<p>No tokens found</p>
						) : (
							<Card className="border-[1.5] border-solid shadow-none">
								<CardHeader className="text-xl font-[500]">Tokens</CardHeader>
								<CardContent>
									<TokensTable tokens={tokens.data} />
								</CardContent>
							</Card>
						)
					) : (
						<p>Something went wrong</p>
					)}
				</TabsContent>
			</Tabs>
		</main>
	);
}
