'use client';

import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogFooter
} from '@/components/ui/dialog';

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
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button title="Delete password" variant="ghost" size="icon" aria-label="Delete password" onClick={() => setIsDialogOpen(true)}>
					<Trash />
				</Button>	
			</DialogTrigger>
			<DialogContent>
				<form action={formAction}>
				<DialogHeader>
						<DialogTitle>Are you absolutely sure you want to delete the password?</DialogTitle>	
						<DialogDescription>
							This will permanently delete the password for <b>{websiteName}</b>. This action cannot be undone.
						</DialogDescription>
				</DialogHeader>	
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>	
					</DialogClose>
					<Button type="submit" variant="destructive" disabled={pending} aria-disabled={pending}>Delete Password</Button>
				</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
