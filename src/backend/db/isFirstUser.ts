import openDb from '@/backend/db/openDb';
import { FirstUserResultType } from '@/types';

export async function isFirstUser(): Promise<FirstUserResultType> {
	const db = await openDb();

	try {
		const row = await db.get<{ count: number }>(
			`SELECT COUNT(*) as count FROM users`
		);
		const count = row?.count ?? 0;
		if (count == 0) {
			return { success: true, data: true };
		} else {
			return { success: true, data: false };
		};
	} catch (err: unknown) {
		console.log("An error occured when counting number of records in DB: ", err);
		return { success: false, error: "An error occured when counting the number of records in DB" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	};

};
