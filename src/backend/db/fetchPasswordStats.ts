import openDb from '@/backend/db/openDb';
import { PasswordData } from '@/types';

export async function fetchPasswordStats(userId: number) {
	const db = await openDb();

	try {
		const passwordStatList = (await db.all(
            		`SELECT strength, last_modified, created_at FROM passwords WHERE user_id=?`,
			userId
        	)) as Pick<PasswordData, 'strength' | 'last_modified' | 'created_at'>[];

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
