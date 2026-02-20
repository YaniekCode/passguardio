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

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { EditPasswordDialog } from '@/components/editPassword/EditPasswordDialog';
import { PasswordData } from '@/lib';
import { formatTimeDifference } from '@/utils/timeDifference/formatTimeDifference';
import { PasswordCategoryBadge } from '@/components/PasswordCategoryBadge';
import { PasswordField } from '@/components/PasswordField';

export function PasswordsTable({ passwords } : { passwords: PasswordData[] }) {
	return (
		<section className="overflow-hidden rounded-md border">
			<Table>
				<TableCaption>A list of your passwords.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Website</TableHead>	
						<TableHead>Username or Email</TableHead>	
						<TableHead>Password</TableHead>	
						<TableHead>Category</TableHead>	
						<TableHead>Last Modified</TableHead>	
						<TableHead>Actions</TableHead>	
					</TableRow>
				</TableHeader>
				<TableBody>	
					{passwords.map((passwordEntry, index) => (
						<TableRow key={index}>
							<TableCell>{passwordEntry.websiteName}</TableCell>
							<TableCell>{passwordEntry.usernameOrEmail}</TableCell>
							<TableCell>
								<PasswordField password={passwordEntry.password}/>	
							</TableCell>
							<TableCell>
								<PasswordCategoryBadge category={passwordEntry.category} />
							</TableCell>
							<TableCell>{formatTimeDifference(passwordEntry.last_modified, new Date().getTime())}</TableCell>
							<TableCell>
								<EditPasswordDialog
									websiteName={passwordEntry.websiteName}
									websiteUrl={passwordEntry.websiteUrl}
									usernameOrEmail={passwordEntry.usernameOrEmail}
									password={passwordEntry.password}
									category={passwordEntry.category}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
    )
}
