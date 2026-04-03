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

import type { Result, UsersStatsType } from '@/types';
import { getSession } from '@/utils/session/sessionUtils';
import { fetchUserStats } from '@/backend/db/fetchUserStats';

export async function handleFetchUserStats(): Promise<Result<UsersStatsType>> {
	const session = await getSession();
	if (!session) {
		return { success: false, error: "User not authenticated" };
	};

	// Fetch user statistics from the DB
	const userStatList = await fetchUserStats();

	if (!userStatList.success) {
		return { success: false, error: "Failed when reading user stats" };
	};


	// Return zero for each statistic if the passwordStatList array is empty
	if (!userStatList.data) {
		return { 
			success: true, 
			data: { totalUsersCount: 0, totalPasswordsCount: 0, strongPasswordsCount: 0, weakPasswordsCount: 0 }
		};
	};

	// Retrieve user statistics from the array
	const { totalUsersCount, totalPasswordsCount, strongPasswordsCount, weakPasswordsCount } = userStatList.data;

	return { 
		success: true, 
		data: { totalUsersCount, totalPasswordsCount, strongPasswordsCount, weakPasswordsCount }
	};
};
