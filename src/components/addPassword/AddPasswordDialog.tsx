'use client';
import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { GeneratePasswordField } from '@/components/GeneratePasswordField';
import { CategorySelect } from '@/components/CategorySelect';
import { addPasswordAction } from '@/actions/addPasswordAction';

export function AddPasswordDialog() {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setIsDialogOpen(true)} ><Plus />Add Password</Button>	
			</DialogTrigger>
			<DialogContent>
				<form
					action={(formData) => {
						addPasswordAction(formData);
						setIsDialogOpen(false)
					}} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>Add New Password</DialogTitle>	
						<DialogDescription>
							Add a new password entry to your vault. All fields marked with * are required.	
						</DialogDescription>
					</DialogHeader>	
					<Label htmlFor="website-name">Website Name *</Label>
					<Input type="text" id="website-name" name="websiteName" placeholder="e.g., Google" required></Input>
					<Label htmlFor="website-url">Website URL</Label>
					<Input type="text" id="website-url" name="websiteUrl" placeholder="https://www.google.com"></Input>
					<Label htmlFor="username-email">Username/Email *</Label>
					<Input type="text" id="username-email" name="usernameOrEmail" placeholder="your@email.com" required></Input>
					<GeneratePasswordField defaultPassword=""/>
					<CategorySelect defaultCategory="social"/>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>	
						</DialogClose>
						<Button type="submit" variant="default">Add Password</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
