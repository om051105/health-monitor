"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, MapPin } from "lucide-react";
import { useState } from "react";

export default function LiveMapPage() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    // Mock data for map markers
    const hotspots = [
        { id: 1, name: "Village Alpha", type: "CRITICAL", cases: 15, source: "Well Water" },
        { id: 2, name: "Sector 4", type: "WARNING", cases: 5, source: "River" },
        { id: 3, name: "North Block", type: "INFO", cases: 2, source: "Tap Water" },
    ];

    return (
        <div className="space-y-6 flex flex-col h-full h-[calc(100vh-8rem)]">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Live Map Monitoring</h1>
                <p className="text-slate-500">
                    Geospatial tracking of symptoms and water quality sources.
                </p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[500px]">
                {/* Map Container */}
                <Card className="col-span-1 lg:col-span-3 shadow-md border-slate-200 overflow-hidden flex flex-col">
                    <CardHeader className="bg-slate-50 border-b pb-4">
                        <CardTitle className="text-lg flex items-center justify-between">
                            <span>District Hotspots</span>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="bg-white"><div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>Critical</Badge>
                                <Badge variant="outline" className="bg-white"><div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>Warning</Badge>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 relative bg-slate-100 flex items-center justify-center">
                        {/* Map Placeholder - In a real app we'd load Leaflet here */}
                        <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/12/3001/1683.png')] bg-cover bg-center opacity-50 mix-blend-multiply"></div>

                        <div className="relative z-10 text-center bg-white/90 p-6 rounded-xl shadow-lg border border-slate-200 backdrop-blur-sm">
                            <MapPin className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                            <h3 className="font-bold text-slate-800">Map Interface Ready</h3>
                            <p className="text-sm text-slate-500 mt-2 max-w-xs">Leaflet bounds configured for Northeast region. Awaiting live coordinate data stream.</p>
                        </div>

                        {/* Mock Markers */}
                        <div className="absolute top-1/4 left-1/3 group cursor-pointer" onClick={() => setSelectedRegion("Village Alpha")}>
                            <div className="absolute -inset-2 bg-red-500/30 rounded-full animate-ping"></div>
                            <div className="relative h-4 w-4 bg-red-600 border-2 border-white rounded-full"></div>
                        </div>

                        <div className="absolute bottom-1/3 right-1/4 cursor-pointer" onClick={() => setSelectedRegion("Sector 4")}>
                            <div className="h-4 w-4 bg-amber-500 border-2 border-white rounded-full shadow-md"></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Info Panel */}
                <Card className="col-span-1 shadow-md border-slate-200 flex flex-col">
                    <CardHeader>
                        <CardTitle>Region Details</CardTitle>
                        <CardDescription>Click a map marker to view stats</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        {selectedRegion ? (
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="font-bold text-xl text-slate-800">{selectedRegion}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-sm font-medium text-red-600">Action Required</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                                        <span className="text-sm text-slate-500">Reported Cases</span>
                                        <span className="font-bold text-slate-800">15</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                                        <span className="text-sm text-slate-500">Water Source</span>
                                        <span className="font-medium text-slate-800 dark:text-slate-100">Contaminated Well</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                                        Dispatch Team
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
                                <MapPin className="h-8 w-8 text-slate-300" />
                                <p>Select a region on the map to view detailed analytics.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
