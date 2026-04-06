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

import { Key, Shield, AlertTriangle, TrendingUp, User } from "lucide-react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function StatCard({
	title,
	counter,
	icon,
}: {
	title: string;
	counter: number;
	icon: "key" | "shield" | "danger" | "trend" | "user" | "purpleKey";
}) {
	const ICON_CONFIG = {
		key: {
			icon: Key,
			bg: "bg-[#2c4c5f]",
			color: "#0084d1",
		},
		shield: {
			icon: Shield,
			bg: "bg-[#344f39]",
			color: "#00c951",
		},
		danger: {
			icon: AlertTriangle,
			bg: "bg-[#564147]",
			color: "#ec003f",
		},
		trend: {
			icon: TrendingUp,
			bg: "bg-[#484361]",
			color: "#8e51ff",
		},
		user: {
			icon: User,
			bg: "bg-[#2c4c5f]",
			color: "#0084d1",
		},
		purpleKey: {
			icon: Key,
			bg: "bg-[#484361]",
			color: "#8e51ff",
		},
	} as const;
	const config = ICON_CONFIG[icon];
	const Icon = config.icon;

	return (
		<Card className="border-[1.5] border-solid shadow-none min-w-[250px]">
			<CardHeader className="text-muted-foreground">{title}</CardHeader>
			<CardContent className="flex items-center justify-between">
				<span className="text-4xl font-semibold">{counter}</span>
				<div className={`flex items-center justify-center size-12 rounded-lg ${config.bg}`}>
					<Icon color={config.color} size={28} />
				</div>
			</CardContent>
		</Card>
	);
}
