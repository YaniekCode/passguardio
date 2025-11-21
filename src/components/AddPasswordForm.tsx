import addPasswordAction from "@/actions/addPasswordAction";

export default function AddPasswordForm() {
	return (
		<form action={addPasswordAction}>
			<label htmlFor="name">Name</label>
			<input type="text" name="name"></input>	
			<br />
			<label htmlFor="password">Password</label>
			<input type="password" name="password"></input>	
			<br />
			<label htmlFor="url">URL</label>
			<input type="text" name="url"></input>	
			<br />
			<button>Add password</button>
		</form>
	);
};
