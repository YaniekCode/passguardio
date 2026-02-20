"use client";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { generateRandomPassword } from "@/components/generateRandomPassword";

type Props = {
	setPassword: (password: string) => void;
	setIsOpen: (isOpen: boolean) => void;
};


export function PasswordLengthSlider({ setPassword, setIsOpen }: Props) {
	const [passwordLength, setPasswordLength] = useState<number>(16);

	function generatePassword() {
		const generatedPassword = generateRandomPassword(passwordLength);
		setPassword(generatedPassword);
		setIsOpen(false);
	};
	return (
		<>
			<Slider
				value={[passwordLength]}
				min={4}
				max={100}
				step={1}
				onValueChange={(value) => setPasswordLength(value[0])}
			/>
			<p className="text-center"><span className="text-sm text-muted-foreground">Password Length: </span><span className="text-lg font-semibold">{passwordLength}</span></p>
			<br></br>
			<div className="flex justify-end gap-2">
				<Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
				<Button variant="default" onClick={generatePassword}>Generate</Button>
			</div>
		</>
	);
};
