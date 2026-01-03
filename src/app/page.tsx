import type { Metadata } from "next";

import overallStyles from "@/app/styles/overallStyles.module.css";
import LoginForm from "@/components/login/loginForm";

export const metadata: Metadata = {
	title: 'Log in | Passguardio',
	description: 'Log in to Passguardio to access your secure, local password manager.',
};

export default function LoginPage() {
	return (
    		<div className={overallStyles.page}>
      			<main>
      				<h1 className={overallStyles.pageTitle}>Log in</h1>
				<LoginForm/>
      			</main>
    		</div>
	);
};
