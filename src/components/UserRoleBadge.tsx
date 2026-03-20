import { Badge } from '@/components/ui/badge';

import { UserRoleType } from "@/types";

export function UserRoleBadge({ role }: { role: UserRoleType }) {
	const badgeTextColorMap = {
		user: "text-blue-500",
		admin: "text-rose-500",
	} as const;
	return (
		<>
			<Badge className={`${badgeTextColorMap[role]} rounded-md`} variant="outline">
				{role}
			</Badge>
		</>
	);
};
