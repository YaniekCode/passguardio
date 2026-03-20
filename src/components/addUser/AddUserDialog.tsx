'use client';

import { Plus } from 'lucide-react';
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
import {
	NativeSelect,
	NativeSelectOption,
} from "@/components/ui/native-select"
import { Label } from '@/components/ui/label';

import { firaCode } from '@/app/fonts';
import { useAddUser } from '@/hooks/useAddUser';


export function AddUserDialog() {
	const { state, isDialogOpen, setIsDialogOpen, formAction, pending } = useAddUser();

	const generatedToken = state.success ? state.token : null;

	// Format the token to look like this 123-456
	const formattedToken = generatedToken && generatedToken.replace(/(\d{3})(\d{3})/, "$1-$2");

	// Copy the token without the hyphen
	function handleCopy(e: React.ClipboardEvent) {
		e.preventDefault();
		generatedToken && e.clipboardData.setData("text/plain", generatedToken);
	};


	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setIsDialogOpen(true)} ><Plus />Add User</Button>	
			</DialogTrigger>
			<DialogContent>
				{(generatedToken == null) ? (
				<form action={formAction} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>Add New User</DialogTitle>	
						<DialogDescription>
							Add a new user to your vault. All fields marked with * are required.	
						</DialogDescription>
					</DialogHeader>	
					<Label htmlFor="role">Role *</Label>
					<NativeSelect id="role" name="role">
						<NativeSelectOption value="user">User</NativeSelectOption>	
						<NativeSelectOption value="admin">Admin</NativeSelectOption>	
					</NativeSelect>
					<div id="role-error" aria-live="polite" aria-atomic="true">
						{!state.success && "formErrors" in state && state.formErrors?.role && (
  							<p className="text-sm text-red-500">
    								{state.formErrors.role[0]}
  							</p>
						)}
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>	
						</DialogClose>
						<Button type="submit" variant="default" disabled={pending} aria-disabled={pending}>Add User</Button>
					</DialogFooter>
				</form>
				) : (
					<DialogHeader>
						<DialogTitle>Account activation token</DialogTitle>
						<DialogDescription>
							Share this token with the person you would like to add to PassGuardio.<br />
							This token expires in 24 hours.	
						</DialogDescription>
						<p className={`${firaCode.className} font-[600] text-center text-4xl my-5`}>
							<data value={generatedToken} onCopy={handleCopy}>{formattedToken}</data>	
						</p>
					</DialogHeader>
				)}
			</DialogContent>
		</Dialog>
	);
};
