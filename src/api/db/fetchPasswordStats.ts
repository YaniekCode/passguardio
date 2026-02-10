import openDb from '@/api/db/openDb';
import { PasswordData } from '@/lib';

export async function fetchPasswordStats(userId: number) {
	const db = await openDb();

	try {
		const passwordStatList = (await db.all(
            		`SELECT strength, last_modified FROM passwords WHERE user_id=?`,
			userId
        	)) as Pick<PasswordData, 'strength' | 'last_modified'>[];

		return { success: true, data: passwordStatList };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when reading password stats" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};
