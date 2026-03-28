import openDb from '@/backend/db/openDb';
import { Result, UsersStatsType } from '@/types';

export async function fetchUserStats(): Promise<Result<UsersStatsType>> {
	const db = await openDb();

	try {
        /*
        Select the number of users, number of passwords, number of strong
        passwords(strength > 3) and number of weak passwords(strength <= 3)
        */
		const userStatList = (await db.get(
            		`SELECT 
                        (SELECT COUNT(*) FROM users) AS totalUsersCount,
                        COUNT(*) AS totalPasswordsCount,
                        SUM(CASE WHEN strength > 3 THEN 1 ELSE 0 END) AS strongPasswordsCount,
                        SUM(CASE WHEN strength <= 3 THEN 1 ELSE 0 END) AS weakPasswordsCount
                    FROM passwords;`,
        	)) as UsersStatsType;

		return { success: true, data: userStatList };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when reading user stats" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};