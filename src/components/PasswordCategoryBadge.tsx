import { Badge } from '@/components/ui/badge';

import { PasswordCategoryType } from "@/lib";

export function PasswordCategoryBadge({ category }: { category: PasswordCategoryType }) {
	const badgeTextColorMap = {
		social: "text-blue-500",
		work: "text-purple-600",
		finance: "text-emerald-600",
		entertainment: "text-fuchsia-500",
		shopping: "text-orange-500",
		other: "text-gray-300"
	} as const;
	return (
		<>
			<Badge className={`${badgeTextColorMap[category]} rounded-md`} variant="outline">
				{category}
			</Badge>
		</>
	);
};
