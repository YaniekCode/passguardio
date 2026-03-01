'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
	NativeSelect,
	NativeSelectOption
} from '@/components/ui/native-select';

import { PasswordCategoryType } from '@/types';

export function CategorySelect({ defaultCategory, ariaDescribedBy }: { defaultCategory: PasswordCategoryType, ariaDescribedBy?: string }) {
	const [category, setCategory] = useState<string>(defaultCategory);
	return (
		<>
			<Label htmlFor="category">Category</Label>
			<NativeSelect id="category" value={category} onChange={(e) => setCategory(e.target.value)} name="category" aria-describedby={ariaDescribedBy}>
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
