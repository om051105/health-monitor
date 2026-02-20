import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const json = await req.json();
        const { latitude, longitude, locationName, symptoms, severity, patientCount, notes } = json;

        const user = await db.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const report = await db.report.create({
            data: {
                reporterId: user.id,
                latitude,
                longitude,
                locationName,
                symptoms: JSON.stringify(symptoms),
                severity,
                patientCount: patientCount || 1,
                notes,
            }
        });

        return NextResponse.json(report);
    } catch (error) {
        console.error("[REPORTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const reports = await db.report.findMany({
            orderBy: { timestamp: 'desc' },
            include: {
                reporter: {
                    select: { name: true, role: true }
                }
            }
        });

        return NextResponse.json(reports);
    } catch (error) {
        console.error("[REPORTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
