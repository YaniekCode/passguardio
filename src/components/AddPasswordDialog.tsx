import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,
	DialogDescription, DialogHeader,
	DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { GeneratePasswordField } from "@/components/GeneratePasswordField";

export function AddPasswordDialog() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button><Plus />Add Password</Button>	
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Password</DialogTitle>	
						<DialogDescription>
							Add a new password entry to your vault. All fields marked with * are required.	
						</DialogDescription>
					</DialogHeader>	
					<Label htmlFor="website-name">Website Name *</Label>
					<Input id="website-name" placeholder="e.g., Google"></Input>
					<Label htmlFor="website-url">Website URL</Label>
					<Input id="website-url" placeholder="https://www.google.com"></Input>
					<Label htmlFor="username-email">Username/Email *</Label>
					<Input id="username-email" placeholder="your@email.com"></Input>
					<GeneratePasswordField />
				</DialogContent>
			</form>	
		</Dialog>
	);
};
