import { Poppins, Fira_Code } from 'next/font/google';

export const poppinsSans = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});

export const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["500", "600"],
});
