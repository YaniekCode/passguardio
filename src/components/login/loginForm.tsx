"use client";

import formStyles from "@/app/styles/formStyles.module.css";
import login from "@/actions/login/login";
import { FormState } from "@/lib";
import FormMessageBox from "@/components/formMessageBox";
import { useActionState } from "react"; 
import { startTransition} from "react";
import Link from "next/link";

export default function SignupForm() {

	const [state, formAction, isPending] = useActionState<FormState, FormData>(login, { success: true, message: "", error: "" });

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
			<label htmlFor="email" className={formStyles.textPrimary}>Email<span className={formStyles.textRequiredFields}>*</span></label><br />
			<input type="email" name="email"></input><br />
		</div>
		<div className={formStyles.formInputGroup}>
			<label htmlFor="password" className={formStyles.textPrimary}>Password<span className={formStyles.textRequiredFields}>*</span></label><br />
			<input type="password" name="password" minLength={8} required></input>
		</div>
		<small className={formStyles.textRequiredFields}>* required fields</small>
		<div className={formStyles.formRedirect}>
			<Link href="/signup" className={formStyles.formRedirectLink}>Don't have an account yet? Create one here.</Link>
		</div>
		{ state.error ? <FormMessageBox message={state.error}/> : null }
		<button className={formStyles.submit} disabled={isPending}>Login</button>
		</form>
	);
};
