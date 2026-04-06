/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2026 YaniekCode
 *
 * This file is part of PassGuardio.
 *
 * PassGuardio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PassGuardio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PassGuardio.  If not, see <https://www.gnu.org/licenses/>.
 */

"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
import { toast } from "sonner";

export default function PasswordField({ password }: { password: string }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	function copyText() {
		navigator.clipboard.writeText(password);
		toast.success("Password copied to clipboard", { position: "bottom-right" });
	}
	return (
		<div className="flex gap-2 align-center">
			{/* If the password should be visible it is displayed, otherwise a fallback is displayed */}
			{isPasswordVisible ? (
				<p className="text-xs">{password}</p>
			) : (
				<p className="tracking-[2.5]">{"•".repeat(8)}</p>
			)}

			<button
				onClick={() => setIsPasswordVisible((prev) => !prev)}
				aria-label={isPasswordVisible ? "Hide password" : "Show password"}
				aria-pressed={isPasswordVisible}
			>
				{isPasswordVisible ? (
					<EyeOff size="14" className="text-muted-foreground" />
				) : (
					<Eye size="14" className="text-muted-foreground" />
				)}
			</button>

			<button onClick={() => copyText()} aria-label="Copy password to clipboard">
				<Copy size="14" className="text-muted-foreground" />
			</button>
		</div>
	);
}
