import { inngest } from "@/lib/inngest/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
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

        const supabase = createAdminClient();

        // 1. Fetch series name for the placeholder title
        const { data: series } = await supabase
            .from('video_series')
            .select('series_name')
            .eq('id', seriesId)
            .single();

        // 2. Insert initial record with 'processing' status
        const { data: videoRecord, error: insertError } = await supabase
            .from('generated_videos')
            .insert({
                series_id: seriesId,
                user_id: userId,
                title: series?.series_name || "Untitled Video",
                status: 'processing'
            })
            .select()
            .single();

        if (insertError) {
            logToFile("API: Insert Error", insertError);
            throw new Error(`Failed to create video record: ${insertError.message}`);
        }

        // 3. Trigger the Inngest function, passing the record ID
        const result = await inngest.send({
            name: "video/generate.requested",
            data: {
                seriesId,
                userId,
                videoId: videoRecord.id
            },
        });

        logToFile("API: Inngest event sent", result);

        return NextResponse.json({ success: true, videoId: videoRecord.id });
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
