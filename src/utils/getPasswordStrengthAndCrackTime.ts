import zxcvbn from 'zxcvbn';

// Function calculates the password strength and crack time using zxcvbn
export function getPasswordStrengthAndCrackTime(password: string): { strength: number, crackTime: string} {
	const result = zxcvbn(password);

	const strength = result.score;
	const crackTime = (result.crack_times_display.offline_slow_hashing_1e4_per_second).toString();

	return { strength, crackTime };
};
