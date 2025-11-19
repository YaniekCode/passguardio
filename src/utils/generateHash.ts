import bcrypt from 'bcryptjs';

export default function generateHash(password: string): string {
	const saltRounds = process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 13;

	const hash = bcrypt.hashSync(password, saltRounds);
	return hash;
};
