import DashboardNav from "@/components/dashboardNavigation/DashboardNav";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen w-full flex-col bg-muted/40 sm:pl-14">
            <DashboardNav />
            <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                {children}
            </main>
        </main>
    )
}