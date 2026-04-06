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

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { poppinsSans } from "@/app/fonts";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
	title: {
		default: "Passguardio",
		template: "%s | Passguardio",
	},
	description: "A simple, local and fast password manager with a web interface.",
	applicationName: "Passguardio",
	authors: [{ name: "YaniekCode" }],
	keywords: ["password manager", "security", "local", "Passguardio"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
			<body className={`${poppinsSans.variable} bg-background antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{/* tooltip provider responsible for displaying tooltips on hover */}
					<TooltipProvider>
						<main>{children}</main>
						<Toaster />
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
