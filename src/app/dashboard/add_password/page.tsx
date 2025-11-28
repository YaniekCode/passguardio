import AddPasswordForm from "@/components/AddPasswordForm";

import { getSession } from "@/utils/session/sessionUtils";

export default async function AddPassword() {
	const session = await getSession();

	return (
		<div>
			<h1>Hello { session.username }</h1>
			<AddPasswordForm></AddPasswordForm>
		</div>
	);
};
