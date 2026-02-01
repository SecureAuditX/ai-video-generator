import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
    } = body;

    // Validate required fields
    if (
      !niche ||
      !language ||
      !voice ||
      !videoStyle ||
      !captionStyle ||
      !seriesName ||
      !videoDuration ||
      !platform ||
      !publishTime
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("video_series")
      .insert({
        user_id: userId,
        niche,
        language,
        voice,
        background_music: backgroundMusic,
        video_style: videoStyle,
        caption_style: captionStyle,
        series_name: seriesName,
        video_duration: videoDuration,
        platform: platform,
        publish_time: new Date(publishTime).toISOString(),
        status: "scheduled",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[VIDEO_SERIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
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
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[VIDEO_SERIES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
