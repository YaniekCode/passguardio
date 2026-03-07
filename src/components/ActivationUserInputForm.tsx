import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ActivationUserInputForm() {
    return (
        <form className="border-1 border-solid w-100 rounded-lg p-10 mt-10 flex flex-col gap-5">
                <div>
				    <Label htmlFor="fullName" className="mb-1">Full Name</Label>
                    <Input type="text" name="fullName" id="fullName" placeholder="John Smith"/>
                </div>
                <div>
				    <Label htmlFor="password" className="mb-1">Password</Label>
                    <Input type="password" name="password" id="password" />
                </div>
				<Button type="submit" className="w-full mt-5">Activate Account</Button>
			</form>

    )
}