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
import { Poppins } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const poppinsSans = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});

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
		<html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
			<body className={`${poppinsSans.variable} antialiased`}>
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
