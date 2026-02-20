import { ReactNode } from "react";
import Link from "next/link";
import { Activity, LayoutDashboard, Map, Settings, LogOut, Bell } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r bg-white dark:bg-slate-900 flex flex-col hidden md:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-blue-600 rounded-lg p-2">
                        <Activity className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                        HealthGuard
                    </span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <SidebarLink href="/dashboard" icon={<LayoutDashboard />} label="Overview" active />
                    <SidebarLink href="/dashboard/map" icon={<Map />} label="Live Map" />
                    <SidebarLink href="/dashboard/reports/new" icon={<Activity />} label="Submit Report" />
                    <SidebarLink href="/dashboard/alerts" icon={<Bell />} label="Alerts" />
                    <SidebarLink href="/dashboard/settings" icon={<Settings />} label="Settings" />
                </nav>

                <div className="p-4 border-t">
                    <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors w-full rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        District Health Surveillance
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Bell className="h-5 w-5 text-slate-500 hover:text-slate-800 cursor-pointer transition-colors" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                            MO
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ href, icon, label, active = false }: { href: string; icon: ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}
