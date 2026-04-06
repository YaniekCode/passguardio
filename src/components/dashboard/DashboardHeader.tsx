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
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbPage,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";

import PasswordSearch from "@/components/PasswordSearch";
import AddPasswordDialog from "@/components/addPassword/AddPasswordDialog";
import { getSession } from "@/utils/session/sessionUtils";

export default async function DashboardHeader() {
	const session = await getSession();

	const greeting = session?.username ? `Hello, ${session.username}` : "Hello";

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<header className="flex items-center justify-between">
				<div className="flex items-center gap-5">
					<div>
						<h1 className="text-3xl font-semibold">{greeting}</h1>
						<h2 className="text-muted-foreground">Manage your passwords securely</h2>
					</div>
				</div>
				<AddPasswordDialog />
			</header>
			<PasswordSearch placeholder="Search passwords..." />
		</>
	);
}
