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

import { Shield } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import ActivationTokenInputForm from "@/components/accountActivation/ActivationTokenInputForm";

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="flex flex-col items-center">
				<header className="flex flex-col items-center text-center my-8">
					<Shield size={30} />
					<h1 className="text-3xl font-semibold">Activate Your Account</h1>
					<p className="text-muted-foreground text-center">
						Activate your account using the activation token
					</p>
				</header>
			</div>
			<Card>
				<CardContent>
					<ActivationTokenInputForm />
				</CardContent>
			</Card>
			<p className="mt-4">
				<span className="text-muted-foreground">Already activated? </span>
				<Link href="/login">Login</Link>
			</p>
		</main>
	);
}
