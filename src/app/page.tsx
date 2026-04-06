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

import type { Metadata } from "next";
import { Shield } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import SignupForm from "@/components/signup/SignupForm";

export const metadata: Metadata = {
	title: "Sign up",
	description: "Get started with Passguardio and set up your secure, local password manager.",
};

export default function SignupPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-4">
			<header className="flex flex-col items-center my-8">
				<Shield strokeWidth={2.5} size={40} />
				<h1 className="text-3xl font-semibold">Create Account</h1>
				<p className="text-muted-foreground text-center">
					Sign up to start managing your passwords securely
				</p>
			</header>
			<Card className="w-full max-w-sm">
				<CardContent>
					<SignupForm />
				</CardContent>
			</Card>
		</main>
	);
}
