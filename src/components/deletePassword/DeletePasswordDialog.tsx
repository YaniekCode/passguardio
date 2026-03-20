'use client';

import { DeleteDialog } from '@/components/DeleteDialog';
import { useDeletePassword } from '@/hooks/useDeletePassword';


export function DeletePasswordDialog({
	uuid,
	websiteName
} : {
	uuid: string,
	websiteName: string
}) {
	const { isDialogOpen, setIsDialogOpen, formAction, pending } = useDeletePassword(uuid);

	return (
		<DeleteDialog 
			title="Are you absolutely sure you want to delete the password?"	
			description={
				<>
					This will permanently delete the password for <b>{websiteName}</b>. This action cannot be undone.
				</>
			}
			confirmText="Delete Password"
			triggerLabel="Delete Password"
			formAction={formAction}
			pending={pending}
			isDialogOpen={isDialogOpen}
			setIsDialogOpen={setIsDialogOpen}
		/>
	);
};
