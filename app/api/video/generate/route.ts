import { inngest } from "@/lib/inngest/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { seriesId } = await req.json();
        if (!seriesId) {
            return new NextResponse("Missing seriesId", { status: 400 });
        }

        // Trigger the Inngest function by sending an event
        await inngest.send({
            name: "video/generate.requested",
            data: {
                seriesId,
                userId, // Optional: useful for tracking
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[VIDEO_GENERATE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
