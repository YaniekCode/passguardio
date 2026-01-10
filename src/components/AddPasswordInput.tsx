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

"use client";

import Image from 'next/image'
import AddPasswordInputStyles from '@/components/AddPasswordInput.module.css';
import { useState, useRef } from 'react';

interface PasswordGeneratorProps {
  passwordLength: number;
  setPasswordLength: (length: number) => void;
  onGenerate: (length: number) => void;
}

export default function AddPasswordInput() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [showGeneratorPopup, setShowGeneratorPopup] = useState<boolean>(false);
	const [passwordLength, setPasswordLength] = useState(12); // default password length

	function generatePassword(length: number) {
		const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
        	"!@#$%^&*()-_=+[]{};:,.<>?/|~";

		const randomValues = crypto.getRandomValues(new Uint32Array(length));
		const randomPassword = Array.from(randomValues, x => charset[x % charset.length]).join("");

		if (inputRef.current) {
			inputRef.current.value = randomPassword;
		};
	};

	return (
		<>
			<label htmlFor="passwordInput">Password</label><br />
			<div className={AddPasswordInputStyles.inputContainer}>
				<input id="passwordInput" type="password" name="password" ref={inputRef}></input>	
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
			{ showGeneratorPopup && <PasswordGeneratorSection passwordLength={passwordLength} setPasswordLength={setPasswordLength} onGenerate={generatePassword}></PasswordGeneratorSection> }
		</>
	);
};

function PasswordGeneratorSection({ passwordLength, setPasswordLength, onGenerate} : PasswordGeneratorProps) {
	return (
		<>
			<section id="generator-section" aria-live="polite">
				<p>Generate a random password</p>	
				<label htmlFor="lengthRange">Password: length: { passwordLength }</label>
				<input
					id="lengthRange"
					type="range"
					min={8}
					max={100}
					value={passwordLength}
					onChange={(e) => setPasswordLength(Number(e.target.value))}
				/>
				<button type="button" onClick={() => onGenerate(passwordLength)}>
					Generate
				</button>
			</section>	
		</>
	);
};
