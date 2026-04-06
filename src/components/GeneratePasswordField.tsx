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

"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import PasswordLengthSlider from "@/components/PasswordLengthSlider";

export default function GeneratePasswordField({
	defaultPassword,
	ariaDescribedBy,
}: {
	defaultPassword: string;
	ariaDescribedBy?: string;
}) {
	const [inputPassword, setInputPassword] = useState<string>(defaultPassword);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<Label htmlFor="password">Password *</Label>
			<div className="flex gap-2">
				<Input
					id="password"
					name="password"
					value={inputPassword}
					onChange={(e) => setInputPassword(e.target.value)}
					placeholder="Enter or generate a password"
					minLength={4}
					aria-describedby={ariaDescribedBy}
					required
				></Input>
				<Popover open={isOpen} onOpenChange={setIsOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							title="Generate"
							onClick={() => setIsOpen(!isOpen)}
						>
							<RefreshCw />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<h1 className="text-lg font-semibold">Generate Password</h1>
						<h2 className="text-muted-foreground text-sm mb-5">
							Select your preferred password length and click “Generate”.
						</h2>
						<PasswordLengthSlider
							setPassword={setInputPassword}
							setIsOpen={setIsOpen}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}
