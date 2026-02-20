"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplets, Users, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { DiseaseTrendChart } from "@/components/DiseaseTrendChart";

export default function DashboardOverview() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
                <p className="text-slate-500">
                    Real-time insights across the monitored region.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Reports"
                    value="124"
                    change="+12% from last week"
                    icon={<Users className="h-6 w-6 text-blue-500" />}
                    trend="up"
                    delay={0.1}
                />
                <StatCard
                    title="Water Quality Alerts"
                    value="3"
                    change="-2 since yesterday"
                    icon={<Droplets className="h-6 w-6 text-amber-500" />}
                    trend="down"
                    delay={0.2}
                />
                <StatCard
                    title="Critical Cases"
                    value="12"
                    change="+4 in last 24h"
                    icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
                    trend="up"
                    delay={0.3}
                />
                <StatCard
                    title="System Health"
                    value="98%"
                    change="All sensors active"
                    icon={<Activity className="h-6 w-6 text-emerald-500" />}
                    trend="neutral"
                    delay={0.4}
                />
            </div>

            {/* Placeholder for Charts & Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle>Disease Trends (Last 30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px] w-full pt-4">
                        <DiseaseTrendChart />
                    </CardContent>
                </Card>

                <Card className="col-span-1 shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 items-start border-b pb-4">
                            <div className="mt-1 bg-red-100 p-2 rounded-full">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Critical case reported in Village Alpha</p>
                                <p className="text-xs text-slate-500">10 mins ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start border-b pb-4">
                            <div className="mt-1 bg-amber-100 p-2 rounded-full">
                                <Droplets className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Turbidity spike caught by Sensor N-3</p>
                                <p className="text-xs text-slate-500">45 mins ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start border-b pb-4">
                            <div className="mt-1 bg-blue-100 p-2 rounded-full">
                                <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">ASHA Anita logged 3 minor cases</p>
                                <p className="text-xs text-slate-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="mt-1 bg-emerald-100 p-2 rounded-full">
                                <Activity className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Weekly water test baseline passed</p>
                                <p className="text-xs text-slate-500">5 hours ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon, trend, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
        >
            <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-500">{title}</p>
                            <p className="text-3xl font-bold tracking-tight text-slate-900">{value}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50">
                            {icon}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className={
                            trend === 'up' ? 'text-red-500 font-medium' :
                                trend === 'down' ? 'text-emerald-500 font-medium' :
                                    'text-slate-500 font-medium'
                        }>
                            {change}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
