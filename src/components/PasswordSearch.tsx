'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

export function PasswordSearch({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', '1');
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<InputGroup className="mt-10 mb-5 shadow-none bg-card border-none py-5">
			<InputGroupInput
				className="placeholder:text-muted-foreground"
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);	
				}}
				defaultValue={searchParams.get('query')?.toString()}
				/>
			<InputGroupAddon>
				<Search className="text-neutral-700"/>	
			</InputGroupAddon>
		</InputGroup>
	)
};
