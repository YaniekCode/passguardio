import { getSession } from '@/utils/session/sessionUtils';
import { Result, UsersStatsType } from '@/types';
import { fetchUserStats } from '@/backend/db/fetchUserStats';

export async function handleFetchUserStats(): Promise<Result<UsersStatsType>> {
	const session = await getSession();
	if (!session) {
		return { success: false, error: "Not authenticated user" };
	};

	const userStatList = await fetchUserStats();

	if (!userStatList.success) {
		return { success: false, error: "Failed when reading password stats" };
	};


	// If the passwordStatList array is empty
	if (!userStatList.data) {
		return { 
			success: true, 
			data: { totalUsersCount: 0, totalPasswordsCount: 0, strongPasswordsCount: 0, weakPasswordsCount: 0 }
		};
	};

	const { totalUsersCount, totalPasswordsCount, strongPasswordsCount, weakPasswordsCount } = userStatList.data;

	return { 
		success: true, 
		data: { totalUsersCount, totalPasswordsCount, strongPasswordsCount, weakPasswordsCount }
	};
};
