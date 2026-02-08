import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import { VideoList } from "@/components/dashboard/VideoList";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const user = await currentUser();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-muted-foreground">Please log in to view your videos.</p>
      </div>
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch initial generated videos
  const { data: videos, error } = await supabase
    .from('generated_videos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <div className="container mx-auto max-w-7xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Video Library</h1>
        <p className="text-muted-foreground mt-1">
            Access and download your generated content.
        </p>
      </div>

      <VideoList initialVideos={videos || []} userId={user.id} />
    </div>
  );
}
