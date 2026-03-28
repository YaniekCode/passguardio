import openDb from '@/backend/db/openDb';
import { Result, UserView } from '@/types';


export async function fetchUsers(): Promise<Result<UserView[]>>{
	const db = await openDb();

	try {
		const users  = (await db.all(
            		`SELECT username, email, role FROM users`,
        	)) as UserView[];

		return { success: true, data: users };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when fetching users" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};