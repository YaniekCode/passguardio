import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: {
    		default: "Passguardio",
		template: "%s | Passguardio",
	},
	description: "A simple, local and fast password manager.",
	applicationName: "Passguardio",
	authors: [{ name: "YaniekCode" }],
	keywords: ["password manager", "security", "local", "Passguardio"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
			<body className={`${poppinsSans.variable}`}>
				{children}
			</body>
		</html>
	);
}
