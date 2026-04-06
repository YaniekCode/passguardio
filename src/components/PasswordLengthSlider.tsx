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

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

import { generateRandomPassword } from "@/utils/generateRandomPassword";

type Props = {
	setPassword: (password: string) => void;
	setIsOpen: (isOpen: boolean) => void;
};

export default function PasswordLengthSlider({ setPassword, setIsOpen }: Props) {
	const [passwordLength, setPasswordLength] = useState(16);
	console.log(passwordLength);

	function generatePassword() {
		const generatedPassword = generateRandomPassword(passwordLength);
		setPassword(generatedPassword);
		setIsOpen(false);
	}
	return (
		<>
			{
				<Slider
					value={[passwordLength]}
					min={4}
					max={100}
					step={1}
					onValueChange={(value) => setPasswordLength(value[0] ?? 16)}
				/>
			}
			<p className="text-center">
				<span className="text-sm text-muted-foreground">Password Length: </span>
				<span className="text-lg font-semibold">{passwordLength}</span>
			</p>
			<br></br>
			<div className="flex justify-end gap-2">
				<Button variant="outline" onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<Button variant="default" onClick={generatePassword}>
					Generate
				</Button>
			</div>
		</>
	);
}
