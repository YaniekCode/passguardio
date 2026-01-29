"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function PasswordLengthSlider() {
	const [passwordLength, setPasswordLength] = useState<number>(16);
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
		</>
	);
};
