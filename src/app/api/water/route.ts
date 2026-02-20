import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const recentOnly = searchParams.get('recent') === 'true';

        // Fetch water sources with their recent logs
        const sources = await db.waterSource.findMany({
            include: {
                logs: {
                    orderBy: { timestamp: 'desc' },
                    take: recentOnly ? 1 : 10,
                }
            }
        });

        return NextResponse.json(sources);
    } catch (error) {
        console.error("[WATER_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    // This endpoint would typically be called by IoT sensors
    // or a simulation script
    try {
        const json = await req.json();
        const { sourceId, ph, turbidity, dissolvedOxygen, bacteriaLevel, status } = json;

        const log = await db.waterQualityLog.create({
            data: {
                sourceId,
                ph,
                turbidity,
                dissolvedOxygen,
                bacteriaLevel,
                status
            }
        });

        return NextResponse.json(log);
    } catch (error) {
        console.error("[WATER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
