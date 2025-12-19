"use server";

import addPasswordAction from "@/actions/addPasswordAction";
import formStyles from "@/app/styles/formStyles.module.css";

export default async function AddPasswordForm() {
	return (
		<form className={formStyles.form} action={addPasswordAction}>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="name">Name</label><br />
				<input type="text" name="name"></input>	
			</div>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="password">Password</label><br />
				<input type="password" name="password"></input>	
			</div>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="url">URL</label><br />
				<input type="text" name="url"></input>	
			</div>
			<button className={formStyles.submit}>Add password</button>
		</form>
	);
};
