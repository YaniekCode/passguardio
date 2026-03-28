import { Shield, Home, Users2 } from 'lucide-react';

import { NavItem } from '@/components/dashboardNavigation/NavItem';

export default function DashboardNav() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex" >
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Shield strokeWidth={4}/>
                <NavItem href="/dashboard" label="Dashboard">
                    <Home className="h-5 w-5" /> 
                </NavItem>
                <NavItem href="/dashboard/users" label="Users">
                    <Users2 className="h-5 w-5" /> 
                </NavItem>
            </nav>
       </aside>
    )
}