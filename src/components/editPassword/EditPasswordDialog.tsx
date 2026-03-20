import { type PasswordCategoryType } from "@/types";
import { PasswordDialog } from "@/components/PasswordDialog";

export function EditPasswordDialog({
	uuid,
	websiteName,
	websiteUrl,
	usernameOrEmail,
	password,
	category 
}: {
	uuid: string,
	websiteName: string,
	websiteUrl: string,
	usernameOrEmail: string,
	password: string,
	category: PasswordCategoryType 
}) {

	return <PasswordDialog 
			mode='edit'
			uuid={uuid}
			websiteName={websiteName}
			websiteUrl={websiteUrl}
			usernameOrEmail={usernameOrEmail}
			password={password}
			category={category}
		/>
};
