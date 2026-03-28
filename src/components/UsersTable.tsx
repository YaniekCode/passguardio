import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';

import { UserRoleBadge } from '@/components/UserRoleBadge';
import { UserView } from "@/types";

type Props = {
    users: UserView[];
}

export default function UsersTable({ users }: Props) {
    return (
		<section className="overflow-hidden rounded-md border">
        	<Table>
				<TableCaption>A list of users</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Fullname</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user, index) => {
						return (
							<TableRow key={index}>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<UserRoleBadge role={user.role}/>
								</TableCell>
							</TableRow>
						)

					})}
				</TableBody>
			</Table>
		</section>
    )
}