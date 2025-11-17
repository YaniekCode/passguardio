import bcrypt from 'bcryptjs';

export default async function generateHash(password: string) {
	const saltRounds = process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 13;

	const hash = await bcrypt.hashSync(password, saltRounds);
	return hash;
};
