import { Shield } from 'lucide-react';
import Link from 'next/link';

import { ActivationTokenInputForm } from '@/components/accountActivation/ActivationTokenInputForm';

export default function Page() {

	return (
		<main className="flex flex-col items-center">
			<div className="flex flex-col items-center">
				<Shield size={30}/>
				<div className="text-center">
					<h1 className="text-3xl font-semibold">Activate Your Account</h1>
				</div>
			</div>
			<ActivationTokenInputForm />
			<p className="mt-4">
				<span className="text-muted-foreground">Already activated? </span>
				<Link href="/login">Back to login</Link>
			</p>
		</main>
	);
};
