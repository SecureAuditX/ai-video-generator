import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data, error } = await supabase
            .from("video_series")
            .select("*")
            .eq("id", params.id)
            .eq("user_id", userId)
            .single();

        if (error) {
            console.error("Supabase error:", error);
            return new NextResponse(error.message, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("[VIDEO_SERIES_GET_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { error } = await supabase
            .from("video_series")
            .delete()
            .eq("id", params.id)
            .eq("user_id", userId);

        if (error) {
            console.error("Supabase error:", error);
            return new NextResponse(error.message, { status: 500 });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[VIDEO_SERIES_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const {
            niche,
            language,
            voice,
            backgroundMusic,
            videoStyle,
            captionStyle,
            seriesName,
            videoDuration,
            platform,
            publishTime,
            status,
        } = body;

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const updateData: any = {};
        if (niche !== undefined) updateData.niche = niche;
        if (language !== undefined) updateData.language = language;
        if (voice !== undefined) updateData.voice = voice;
        if (backgroundMusic !== undefined) updateData.background_music = backgroundMusic;
        if (videoStyle !== undefined) updateData.video_style = videoStyle;
        if (captionStyle !== undefined) updateData.caption_style = captionStyle;
        if (seriesName !== undefined) updateData.series_name = seriesName;
        if (videoDuration !== undefined) updateData.video_duration = videoDuration;
        if (platform !== undefined) updateData.platform = platform;
        if (publishTime !== undefined) updateData.publish_time = new Date(publishTime).toISOString();
        if (status !== undefined) updateData.status = status;

        const { data, error } = await supabase
            .from("video_series")
            .update(updateData)
            .eq("id", params.id)
            .eq("user_id", userId)
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error);
            return new NextResponse(error.message, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("[VIDEO_SERIES_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
