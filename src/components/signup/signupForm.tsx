"use client";

import { useActionState } from "react"; 
import { startTransition} from "react";
import Link from "next/link";

import formStyles from "@/app/styles/formStyles.module.css";
import signup from "@/actions/signup/signup";
import { FormState } from "@/lib";
import FormMessageBox from "@/components/FormMessageBox";

export default function SignupForm() {
	const [state, formAction, isPending] = useActionState<FormState, FormData>(signup, { success: true, message: "", error: "" });

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) { // responsible for not clearing form fields afrer form submition
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		startTransition(() => {
    			formAction(formData);
  		});
	};

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}> 
			<div className={formStyles.formInputGroup}>
				<label htmlFor="usernameInput" className={formStyles.textPrimary}>Username<span aria-hidden="true" className={formStyles.textRequiredFields}>*</span></label><br />
				<input id="usernameInput" type="text" name="username" minLength={3} maxLength={50} required></input><br />
			</div>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="emailInput" className={formStyles.textPrimary}>Email<span aria-hidden="true" className={formStyles.textRequiredFields}>*</span></label><br />
				<input id="emailInput" type="email" name="email"></input><br />
			</div>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="passwordInput" className={formStyles.textPrimary}>Password<span aria-hidden="true" className={formStyles.textRequiredFields}>*</span></label><br />
				<input id="passwordInput" type="password" name="password" minLength={8} required></input><br />
			</div>
			<small className={formStyles.textRequiredFields}>* required fields</small><br />
			<div className={formStyles.formRedirect}>
				<Link href="/" className={formStyles.formRedirectLink}>Already have an account? Log in here.</Link>
			</div>
			{ state.error && <FormMessageBox message={state.error}/> }
			<button className={formStyles.submit} disabled={isPending}>Sign up</button>
		</form>
	);
};
