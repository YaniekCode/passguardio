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

// Function responsible for returning strings in a grammatically correct form, so "1 minute ago" instead of "1 minutes ago" etc.
function pluralize(value: number, singular: string, plural: string) {
  return value === 1 ? singular : plural;
}


// Function returns a user friendly time difference from two times(in ms)
export function formatTimeDifference(startTime: number, endTime: number): string {
	const msPerMinute = 60 * 1000;
	const msPerHour = msPerMinute * 60;
	const msPerDay = msPerHour * 24;
	const msPerMonth = msPerDay * 31;
	const msPerYear = msPerDay * 365;

	const timeDiff = Math.max(0, endTime - startTime);

	if (timeDiff < msPerMinute) {
		return "less than a minute ago";
	};

	if (timeDiff < msPerHour) {
		const value = Math.round(timeDiff / msPerMinute);
		return `${value} ${pluralize(value, "minute", "minutes")} ago`;
	};

	if (timeDiff < msPerDay) {
		const value = Math.round(timeDiff / msPerHour);
		return `${value} ${pluralize(value, "hour", "hours")} ago`;
	};

	if (timeDiff < msPerMonth) {
		const value = Math.round(timeDiff / msPerDay);
		return `${value} ${pluralize(value, "day", "days")} ago`;
	};

	if (timeDiff < msPerYear) {
		const value = Math.round(timeDiff / msPerYear);
		return `${value} ${pluralize(value, "month", "months")} ago`;
	};

	const value = Math.round(timeDiff / msPerYear);
	return `${value} ${pluralize(value, "year", "years")} ago`;
};
