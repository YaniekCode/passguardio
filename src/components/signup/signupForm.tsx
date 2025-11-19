"use client";

import styles from "@/components/form.module.css";
import signup from "@/actions/signup/signup";
import { FormState } from "@/lib";
import FormMessageBox from "@/components/formMessageBox";
import { useActionState } from "react"; 
import { startTransition} from "react";

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
      	<form className={styles.form} onSubmit={handleSubmit}> 
		<div className={styles.formInputGroup}>
			<label htmlFor="username" className={styles.textPrimary}>Username<span className={styles.textRequiredFields}>*</span></label><br />
			<input type="text" name="username" minLength={3} maxLength={50} required></input><br />
		</div>
		<div className={styles.formInputGroup}>
			<label htmlFor="email" className={styles.textPrimary}>Email<span className={styles.textRequiredFields}>*</span></label><br />
			<input type="email" name="email"></input><br />
		</div>
		<div className={styles.formInputGroup}>
			<label htmlFor="password" className={styles.textPrimary}>Password<span className={styles.textRequiredFields}>*</span></label><br />
			<input type="password" name="password" minLength={8} required></input><br />
		</div>
		<small className={styles.textRequiredFields}>* required fields</small><br />
		{ state.error ? <FormMessageBox message={state.error}/> : null }
		<button className={styles.formSubmit} disabled={isPending}>Sign up</button>
	</form>

	);
};
