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

import AddPasswordInputStyles from '@/components/addPassword/AddPasswordInput.module.css';

interface PasswordGeneratorProps {
	passwordLength: number;
	setPasswordLength: (length: number) => void;
	onGenerate: (length: number) => void;
}

export default function PasswordGeneratorDialog({ passwordLength, setPasswordLength, onGenerate} : PasswordGeneratorProps) {
	return (
		<>
			<section className={AddPasswordInputStyles.generatorSection} id="generator-section" aria-live="polite">
				<p className={AddPasswordInputStyles.sectionTitle}>Generate a random password</p>	
				<label htmlFor="lengthRange"><span className={AddPasswordInputStyles.passwordLength}>Password length: { passwordLength }</span></label>
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
