import { getSession } from '@/utils/session/sessionUtils';
import { FetchPasswordStatsResultType } from '@/types';
import { fetchPasswordStats } from '@/backend/db/fetchPasswordStats';

export async function handleFetchPasswordStats(): Promise<FetchPasswordStatsResultType> {
	const session = await getSession();
	if (!session) {
		return { success: false, error: "Not authenticated user" };
	};

	const userId = session.id;
	const passwordStatList = await fetchPasswordStats(userId);

	if (!passwordStatList.success) {
		return { success: false, error: "Failed when reading password stats" };
	};


	// If the data does not exist
	if (!passwordStatList.data) {
		return { success: false, error: "Failed to fetch password stats data" };

	};

	// If the passwordStatList array is empty
	if (passwordStatList.data.length == 0) {
		return { 
			success: true, 
			data: { totalPasswordCount: 0, strongPasswordCount: 0, weakPasswordCount: 0, recentlyAddedPasswordCount: 0 }
		};
	};

	// Count the total count of passwords as well as the count of strong and weak passwords
	const totalPasswordCount = passwordStatList.data.length;
	
	// If the password strength is greater than 3 on a 5 scale range we count it as strong
	const strongPasswordCount = passwordStatList.data.filter(password => password.strength > 3).length;

	// If the password strength is smaller of equal to 3 on a 5 scale range we count it as weak
	const weakPasswordCount = passwordStatList.data.filter(password => password.strength <= 3).length;

	// If the password was created less than seven days ago we count it as recently added
	const recentlyAddedPasswordCount = passwordStatList.data
		.filter(password =>
			new Date().getTime() - password.created_at
		       	< 1000 * 60 * 60 * 24 * 7
		).length;


	return { 
		success: true, 
		data: { totalPasswordCount, strongPasswordCount, weakPasswordCount, recentlyAddedPasswordCount }
	};
};
