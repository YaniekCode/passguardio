import { PasswordDatabaseRecordType } from '@/lib';
import { getSession } from "@/utils/session/sessionUtils";
import { PasswordData } from "@/lib";
import isPasswordUUIDInDb from "@/api/db/isPasswordUUIDInDb";
import encryptPassword from "@/utils/encryption/encryptPassword"; 
import updatePassword from "@/api/db/updatePassword";
import { getPasswordStrengthAndCrackTime } from '@/utils/getPasswordStrengthAndCrackTime';

export default async function handleEditPassword(passwordData: PasswordData) {
	const session = await getSession();
	if (!session) {
		return;
	};
	const { id, dek } = session;

	const isPasswordInDb = await isPasswordUUIDInDb(id, passwordData.uuid); // checking if the password to edit exists and that the user is the owner of it 

	if (!isPasswordInDb.success) {
		return { success: false, error: "Password not found" };
	};

	const { encryptedPassword, iv, tag } = encryptPassword(passwordData.password, Buffer.from(dek, "hex"));

	// Get password strength and crack time
	const { strength, crack_time } = getPasswordStrengthAndCrackTime(passwordData.password);

	const passwordDatabaseInputRecord: PasswordDatabaseRecordType = {
		user_id: session.id,
		uuid: passwordData.uuid,
		website_name: passwordData.websiteName,
		website_url: passwordData.websiteUrl,
		username_or_email: passwordData.usernameOrEmail,
		category: passwordData.category,
		password: encryptedPassword,
		strength: strength,
		last_modified: new Date().getTime(),
		created_at: new Date().getTime(),
		crack_time: crack_time,
		iv: iv,
		tag: tag,
	};

	const passwordUpdateResult = updatePassword(passwordDatabaseInputRecord);

	return passwordUpdateResult;
};
