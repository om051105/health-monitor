"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
    { day: "01", cases: 2, waterQuality: 98 },
    { day: "05", cases: 5, waterQuality: 95 },
    { day: "10", cases: 12, waterQuality: 85 },
    { day: "15", cases: 25, waterQuality: 70 },
    { day: "20", cases: 40, waterQuality: 60 },
    { day: "25", cases: 35, waterQuality: 68 },
    { day: "30", cases: 20, waterQuality: 80 },
];

export function DiseaseTrendChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                />
                <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} />

                <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="cases"
                    name="Reported Cases"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorCases)"
                    strokeWidth={3}
                />
                <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="waterQuality"
                    name="Avg Water Quality Score"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorWater)"
                    strokeWidth={3}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
