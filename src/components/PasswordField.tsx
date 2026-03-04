'use client';

import { useState } from 'react';
import { Eye, EyeOff, Copy } from 'lucide-react';
import { toast } from 'sonner';


export function PasswordField({ password }: { password: string }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	function copyText() {
		navigator.clipboard.writeText(password);
		toast.success("Password copied to clipboard", { position: "bottom-right" });
	};
	return (
		<div className="flex gap-2 align-center">
			{ /* If the password should be visible we display it, otherwise we display a fallback */ }
			{ isPasswordVisible
				? <p className="text-xs">{password}</p>
				: <p className="tracking-[2.5]">{"•".repeat(8)}</p>
			}

			<button
				onClick={() => setIsPasswordVisible((prev) => !prev)}
				aria-label={isPasswordVisible ? "Hide password" : "Show password"}		
				aria-pressed={isPasswordVisible}
			>
				{ isPasswordVisible
					? <EyeOff size="14" className="text-muted-foreground"/>
					: <Eye size="14" className="text-muted-foreground"/>
				}
			</button>

			<button
				onClick={() => copyText()}
				aria-label="Copy password to clipboard"
			>
				<Copy size="14" className="text-muted-foreground"/>
			</button>
		</div>
	);
};
