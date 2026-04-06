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

import { Shield, Home, Users2 } from "lucide-react";

import { getSession } from "@/utils/session/sessionUtils";
import DashboardNavItem from "@/components/dashboard/DashboardNavItem";

export default async function DashboardNav() {
	const session = await getSession();

	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
				<Shield strokeWidth={4} />
				<DashboardNavItem href="/dashboard" label="Dashboard">
					<Home className="h-5 w-5" />
				</DashboardNavItem>

				{/* Show the "Users" link only for admin users */}
				{session?.role === "admin" && (
					<DashboardNavItem href="/dashboard/users" label="Users">
						<Users2 className="h-5 w-5" />
					</DashboardNavItem>
				)}
			</nav>
		</aside>
	);
}
