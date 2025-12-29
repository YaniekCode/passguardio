import type { Metadata } from "next";

import overallStyles from "@/app/styles/overallStyles.module.css";
import SignupForm from "@/components/signup/signupForm";

export const metadata: Metadata = {
	title: 'Sign up',
	description: 'Get started with Passguardio and set up your secure, local password manager.',
};

export default function SignupPage() {
	return (
		<div className={overallStyles.page}>
      			<main className={overallStyles.main}>
      				<h1 className={`${overallStyles.pageTitle}`}>Sign up</h1>
				<SignupForm />
      			</main>
    		</div>
	);
}
