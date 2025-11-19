import bcrypt from 'bcryptjs'; 

export default function compareHash(password: string, hash: string) {
	const isEqual = bcrypt.compareSync(password, hash);
	return isEqual;
};	
