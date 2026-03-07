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

import { AddUserDialog } from '@/components/addUser/AddUserDialog';


export const metadata: Metadata = {
	title: "Users",
	description: "Manage users of your PassGuardio instance from the users panel.",
};

export default async function Dashboard() {
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
		</main>
	);
};
