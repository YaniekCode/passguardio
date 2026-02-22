'use client';
import { useState } from 'react';
import { PenSquare } from 'lucide-react';
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

import { PasswordCategoryType } from '@/lib';
import { GeneratePasswordField } from '@/components/GeneratePasswordField';
import { CategorySelect } from '@/components/CategorySelect';
import { editPasswordAction } from '@/actions/editPasswordAction';

export function EditPasswordDialog({ uuid, websiteName, websiteUrl, usernameOrEmail, password, category} : { uuid: string, websiteName: string, websiteUrl: string, usernameOrEmail: string, password: string, category: PasswordCategoryType }) {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button title="Edit password" variant="ghost" size="icon" aria-label="Edit password" onClick={() => setIsDialogOpen(true)}><PenSquare /></Button>	
			</DialogTrigger>
			<DialogContent>
				<form 
					action={(formData) => {
						editPasswordAction(formData);
						setIsDialogOpen(false)
					}} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle>Edit password</DialogTitle>	
						<DialogDescription>
							Edit an existing password entry in your vault. All fields marked with * are required.	
						</DialogDescription>
					</DialogHeader>	
					<input type="hidden" name="uuid" value={uuid}></input>
					<Label htmlFor="website-name">Website Name *</Label>
					<Input type="text" id="website-name" name="websiteName" defaultValue={websiteName} placeholder="e.g., Google" required></Input>
					<Label htmlFor="website-url">Website URL</Label>
					<Input type="text" id="website-url" name="websiteUrl" defaultValue={websiteUrl} placeholder="https://www.google.com"></Input>
					<Label htmlFor="username-email">Username/Email *</Label>
					<Input type="text" id="username-email" name="usernameOrEmail" defaultValue={usernameOrEmail} placeholder="your@email.com" required></Input>
					<GeneratePasswordField defaultPassword={password} />
					<CategorySelect defaultCategory={category} />
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>	
						</DialogClose>
						<Button type="submit" variant="default">Save Password</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
