import crypto from 'node:crypto';

import { PasswordData, PasswordDatabaseRecordType, MessageResultType } from '@/lib';
import encryptPassword from '@/utils/encryption/encryptPassword';
import { getPasswordStrengthAndCrackTime } from '@/utils/getPasswordStrengthAndCrackTime';
import { getSession } from '@/utils/session/sessionUtils';
import addPassword from '@/api/db/addPassword';

export default async function handleAddPassword(passwordData: PasswordData): Promise<MessageResultType | undefined> {
	const session = await getSession();
	if (!session) {
		return;
	};

	// Encrypt the password and generate a random UUID
	const dek = Buffer.from(session.dek, "hex"); // convert dek from string to Buffer type

	const { encryptedPassword, iv, tag } = encryptPassword(passwordData.password, dek);
	const passwordUUID = crypto.randomUUID();


	// Get password strength and crack time
	const { strength, crack_time } = getPasswordStrengthAndCrackTime(passwordData.password);

	const passwordDatabaseInputRecord: PasswordDatabaseRecordType = {
		user_id: session.id,
		uuid: passwordUUID,
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

	const passwordInputResult = addPassword(passwordDatabaseInputRecord);

	return passwordInputResult;
};
