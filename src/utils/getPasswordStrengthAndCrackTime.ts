import zxcvbn from 'zxcvbn';

export function getPasswordStrengthAndCrackTime(password: string) {
	const result = zxcvbn(password);

	const strength = result.score;
	const crack_time = (result.crack_times_display.offline_slow_hashing_1e4_per_second).toString();

	return { strength, crack_time };
};
