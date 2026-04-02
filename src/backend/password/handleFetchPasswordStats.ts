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

import type { Result, PasswordStatsType } from '@/types';
import { getSession } from '@/utils/session/sessionUtils';
import { fetchPasswordStats } from '@/backend/db/fetchPasswordStats';

export async function handleFetchPasswordStats(): Promise<Result<PasswordStatsType>> {
	const session = await getSession();
	if (!session) {
		return { success: false, error: "Not authenticated user" };
	};

	const userId = session.id;

	// Fetch password stats for the user
	const passwordStatList = await fetchPasswordStats(userId);

	if (!passwordStatList.success) {
		return { success: false, error: "Failed when reading password stats" };
	};


	// Return an error if the data does not exist
	if (!passwordStatList.data) {
		return { success: false, error: "Failed to fetch password stats data" };

	};

	// Return zeros for every stat if the user does not own any passwords
	if (passwordStatList.data.length == 0) {
		return { 
			success: true, 
			data: { totalPasswordCount: 0, strongPasswordCount: 0, weakPasswordCount: 0, recentlyAddedPasswordCount: 0 }
		};
	};

	const totalPasswordCount = passwordStatList.data.length;
	
	// If the password strength is greater than 3 on a 5 scale range we count it as strong
	const strongPasswordCount = passwordStatList.data.filter(password => password.strength > 3).length;

	// If the password strength is smaller of equal to 3 on a 5 scale range we count it as weak
	const weakPasswordCount = passwordStatList.data.filter(password => password.strength <= 3).length;

	// If the password was added less than seven days ago we count it as recently added
	const recentlyAddedPasswordCount = passwordStatList.data
		.filter(password =>
			new Date().getTime() - password.createdAt
		       	< 1000 * 60 * 60 * 24 * 7
		).length;


	return { 
		success: true, 
		data: { totalPasswordCount, strongPasswordCount, weakPasswordCount, recentlyAddedPasswordCount }
	};
};
