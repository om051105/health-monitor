"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, MapPin, Users, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function ReportFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);

            // Reset after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Submit Health Report</h1>
                <p className="text-slate-500">
                    Record new symptom clusters or water-borne disease cases.
                </p>
            </div>

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 text-emerald-800 p-4 rounded-lg border border-emerald-200 flex items-center gap-3"
                >
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <p className="font-bold">Report Submitted Successfully</p>
                        <p className="text-sm opacity-90">Data synced to central district repository.</p>
                    </div>
                </motion.div>
            )}

            <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-slate-50 border-b">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Symptom Tracking
                    </CardTitle>
                    <CardDescription>ASHA Worker Data Entry Form</CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Location Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase flex items-center gap-2 border-b pb-2">
                                <MapPin className="h-4 w-4" /> Location Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="village">Village / Zone Name</Label>
                                    <Input id="village" placeholder="e.g. Village Alpha, Ward 3" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">GPS Coordinates</Label>
                                    <div className="flex gap-2">
                                        <Input id="location" value="26.1445° N, 91.7362° E" readOnly className="bg-slate-50 text-slate-500" />
                                        <Button type="button" variant="outline" size="icon" className="shrink-0" title="Refresh GPS">
                                            <MapPin className="h-4 w-4 text-blue-600" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medical Section */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase flex items-center gap-2 border-b pb-2">
                                <Users className="h-4 w-4" /> Patient Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="patients">Number of Patients Affected</Label>
                                    <Input id="patients" type="number" min="1" placeholder="1" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="severity">Severity Level</Label>
                                    <Select defaultValue="medium">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select severity" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low (Mild symptoms)</SelectItem>
                                            <SelectItem value="medium">Medium (Moderate, seeking care)</SelectItem>
                                            <SelectItem value="high">High (Severe, hospitalization needed)</SelectItem>
                                            <SelectItem value="critical">Critical (Life-threatening/Outbreak)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <Label>Primary Symptoms (Check all that apply)</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                    {["Diarrhea", "Vomiting", "Fever", "Stomach Cramps", "Dehydration", "Jaundice"].map(symptom => (
                                        <label key={symptom} className="flex items-center gap-2 p-3 border rounded-md hover:bg-slate-50 cursor-pointer transition-colors">
                                            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                                            <span className="text-sm font-medium">{symptom}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-medium shadow-md transition-all active:scale-[0.98]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2"><div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Syncing...</span>
                            ) : (
                                <span className="flex items-center gap-2"><Send className="h-5 w-5" /> Submit Report</span>
                            )}
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
