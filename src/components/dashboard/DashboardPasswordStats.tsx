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

import { StatCard } from '@/components/StatCard';
import { handleFetchPasswordStats } from '@/backend/password/handleFetchPasswordStats';

export default async function DashboardPasswordStats() {
    const fetchPasswordStatsResult = await handleFetchPasswordStats();
	if (!fetchPasswordStatsResult?.success) {
		// todo failed reading password stats
		return;
	}

	const { totalPasswordCount, strongPasswordCount, weakPasswordCount, recentlyAddedPasswordCount } = fetchPasswordStatsResult.data;

    return (
        <section className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<StatCard title="Total Password" counter={totalPasswordCount} icon="key"/>
			<StatCard title="Strong Passwords" counter={strongPasswordCount} icon="shield"/>
			<StatCard title="Weak Passwords" counter={weakPasswordCount} icon="danger"/>
			<StatCard title="Recently Added" counter={recentlyAddedPasswordCount} icon="trend"/>
		</section>
    )
}