import { inngest } from "@/lib/inngest/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function logToFile(message: string, data?: any) {
    const logPath = path.join(process.cwd(), "debug.log");
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message} ${data ? JSON.stringify(data) : ""}\n`;
    fs.appendFileSync(logPath, logEntry);
}

export async function POST(req: Request) {
    try {
        logToFile("API: /api/video/generate hit");
        const { userId } = await auth();
        if (!userId) {
            logToFile("API: Unauthorized");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { seriesId } = await req.json();
        if (!seriesId) {
            logToFile("API: Missing seriesId");
            return new NextResponse("Missing seriesId", { status: 400 });
        }
        logToFile("API: seriesId received", { seriesId, userId });

        // Trigger the Inngest function by sending an event
        const result = await inngest.send({
            name: "video/generate.requested",
            data: {
                seriesId,
                userId,
            },
        });

        logToFile("API: Inngest event sent", result);

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        logToFile("API: Error", { message: error.message, stack: error.stack });
        console.error("[VIDEO_GENERATE_POST] Error:", error);
        return new NextResponse(JSON.stringify({
            error: "Internal Error",
            details: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
