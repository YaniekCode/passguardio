"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { PasswordLengthSlider } from "@/components/addPassword/PasswordLengthSlider";

export function GeneratePasswordField() {
	const [password, setPassword] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<Label htmlFor="password">Password *</Label>
			<div className="flex gap-2">
				<Input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter or generate a password"></Input>
				<Popover open={isOpen} onOpenChange={setIsOpen}>
					<PopoverTrigger asChild>
						<Button variant="outline" size="icon" title="Generate" onClick={() => setIsOpen(!isOpen)}><RefreshCw /></Button>
					</PopoverTrigger>
					<PopoverContent>
						<h1 className="text-lg font-semibold">Generate Password</h1>
						<h2 className="text-muted-foreground text-sm mb-5">Select your preferred password length and click “Generate.”.</h2>
						<PasswordLengthSlider setPassword={setPassword} setIsOpen={setIsOpen}/>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);

}
