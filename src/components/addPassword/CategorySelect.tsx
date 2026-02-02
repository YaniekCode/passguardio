import { Label } from '@/components/ui/label';
import {
	NativeSelect,
	NativeSelectOption
} from '@/components/ui/native-select';

export function CategorySelect() {
	return (
		<>
			<Label htmlFor="category">Category</Label>
			<NativeSelect id="category" name="category">
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
