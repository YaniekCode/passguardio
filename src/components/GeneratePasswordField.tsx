import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { PasswordLengthSlider } from "@/components/PasswordLengthSlider";

export function GeneratePasswordField() {
	return (
		<>
			<Label htmlFor="password">Password *</Label>
			<div className="flex gap-2">
				<Input id="password" placeholder="Enter or generate a password"></Input>
				<Popover>
					<PopoverTrigger>
						<Button variant="outline" size="icon" title="Generate"><RefreshCw /></Button>
					</PopoverTrigger>
					<PopoverContent>
						<h1 className="text-lg font-semibold">Generate Password</h1>
						<h2 className="text-muted-foreground text-sm mb-5">Select your preferred password length and click “Generate.”.</h2>
						<PasswordLengthSlider />
						<br></br>
						<div className="flex justify-end gap-2">
							<Button variant="outline">Cancel</Button>
							<Button variant="default">Generate</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);

}
