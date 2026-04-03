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

'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import {
	NativeSelect,
	NativeSelectOption
} from '@/components/ui/native-select';

import type { PasswordCategoryType } from '@/types';

export default function CategorySelect({
	defaultCategory,
	ariaDescribedBy
}: {
	defaultCategory: PasswordCategoryType,
	ariaDescribedBy?: string
}) {
	const [category, setCategory] = useState<string>(defaultCategory);
	return (
		<>
			<Label htmlFor="category">Category</Label>
			<NativeSelect
				id="category"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				name="category"
				aria-describedby={ariaDescribedBy}
				>
				<NativeSelectOption value="social">Social</NativeSelectOption>	
				<NativeSelectOption value="work">Work</NativeSelectOption>	
				<NativeSelectOption value="finance">Finance</NativeSelectOption>	
				<NativeSelectOption value="entertainment">Entertainment</NativeSelectOption>	
				<NativeSelectOption value="shopping">Shopping</NativeSelectOption>	
				<NativeSelectOption value="other">Other</NativeSelectOption>	
			</NativeSelect>
		</>
	);
};
