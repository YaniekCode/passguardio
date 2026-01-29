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

import { useState, useRef } from 'react';
import Image from 'next/image'

import PasswordGeneratorDialog from '@/components/addPassword/PasswordGeneratorDialog';
import AddPasswordInputStyles from '@/components/addPassword/AddPasswordInput.module.css';

import generateRandomPassword from '@/components/addPassword/generateRandomPassword';

// Password input with random password generator
export default function AddPasswordInput() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [showGeneratorPopup, setShowGeneratorPopup] = useState<boolean>(false);
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [passwordLength, setPasswordLength] = useState<number>(12); // default password length

	// passes the selected password length to the generator function
	function generatePassword(length: number): void {
		const randomPassword = generateRandomPassword(length);

		if (inputRef.current) {
			inputRef.current.value = randomPassword;
		};
	};

	return (
		<>
			<label htmlFor="passwordInput">Password</label><br />
			<div className={AddPasswordInputStyles.inputContainer}>
				{ passwordVisible ?
					<input className={AddPasswordInputStyles.passwordInput} id="passwordInput" type="text" name="password" ref={inputRef}></input> : // display a type text input
					<input className={AddPasswordInputStyles.passwordInput} id="passwordInput" type="password" name="password" ref={inputRef}></input> // display a password input
				}
				<button type="button" 
					className={AddPasswordInputStyles.eyeButton}
					aria-label="Show password"
					aria-controls="passwordInput"
					onClick={() => setPasswordVisible((prev) => !prev)}
				>
					<Image
						src="/icons/eye-solid-full.svg"
						alt=""
						aria-hidden="true"
						width={25}
						height={25}
					/>
				</button>
				<button type="button" 
					className={AddPasswordInputStyles.diceButton}
					aria-label="Generate a random password"
					aria-controls="passwordInput"
					onClick={() => setShowGeneratorPopup((prev) => !prev)}
				>
					<Image
						src="/icons/dice-four-solid-full.svg"
						alt=""
						aria-hidden="true"
						width={25}
						height={25}
					/>
				</button>
			</div>
			{ showGeneratorPopup &&
				<PasswordGeneratorDialog
					passwordLength={passwordLength}
					setPasswordLength={setPasswordLength}
					onGenerate={generatePassword}>
				</PasswordGeneratorDialog> }
		</>
	);
};
