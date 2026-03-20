'use client';

import { DeleteDialog } from '@/components/DeleteDialog';
import { useDeleteToken } from '@/hooks/useDeleteToken';


export function DeleteTokenDialog({ token } : { token: string }) {
	const { isDialogOpen, setIsDialogOpen, formAction, pending } = useDeleteToken(token);

	return (
		<DeleteDialog 
			title="Are you absolutely sure you want to delete the token?"	
			description="This will permanently delete this token. This action cannot be undone."
			confirmText="Delete Token"
			triggerLabel="Delete Token"
			formAction={formAction}
			pending={pending}
			isDialogOpen={isDialogOpen}
			setIsDialogOpen={setIsDialogOpen}
		/>
	);
};