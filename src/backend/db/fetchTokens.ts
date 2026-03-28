import openDb from '@/backend/db/openDb';
import { Result, TokenDatabaseRecordType } from '@/types';


export async function fetchTokens(): Promise<Result<TokenDatabaseRecordType[]>>{
	const db = await openDb();

	try {
		const tokens  = (await db.all(
            		`SELECT role, token, expires_at FROM tokens`,
        	)) as TokenDatabaseRecordType[];

		return { success: true, data: tokens };
	} catch (err: unknown) {
		console.log(err);
		return { success: false, error: "An error occurred when fetching tokens" };
	} finally {
		try {
			await db.close();
		} catch (closeErr) {
			console.error("Failed to close DB: ", closeErr);
		}
	}
};
