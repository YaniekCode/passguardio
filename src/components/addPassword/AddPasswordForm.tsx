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

"use server";

import addPasswordAction from "@/actions/addPasswordAction";
import AddPasswordInput from "@/components/addPassword/AddPasswordInput";
import formStyles from "@/app/styles/formStyles.module.css";

export default async function AddPasswordForm() {
	return (
		<form className={formStyles.form} action={addPasswordAction}>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="passwordNameInput">Name</label><br />
				<input id="passwordNameInput" type="text" name="name"></input>	
			</div>
			<div className={formStyles.formInputGroup}>
				<AddPasswordInput></AddPasswordInput>
			</div>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="passwordUrlInput">URL</label><br />
				<input id="passwordUrlInput" type="text" name="url"></input>	
			</div>
			<button type="submit" className={formStyles.submit}>Add password</button>
		</form>
	);
};
