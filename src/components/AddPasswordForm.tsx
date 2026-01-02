"use server";

import addPasswordAction from "@/actions/addPasswordAction";
import formStyles from "@/app/styles/formStyles.module.css";

export default async function AddPasswordForm() {
	return (
		<form className={formStyles.form} action={addPasswordAction}>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="passwordNameInput">Name</label><br />
				<input id="passwordNameInput" type="text" name="name"></input>	
			</div>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="passwordInput">Password</label><br />
				<input id="passwordInput" type="password" name="password"></input>	
			</div>
			<div className={formStyles.formInputGroup}>
				<label htmlFor="passwordUrlInput">URL</label><br />
				<input id="passwordUrlInput" type="text" name="url"></input>	
			</div>
			<button className={formStyles.submit}>Add password</button>
		</form>
	);
};
