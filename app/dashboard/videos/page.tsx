import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import { Play, Calendar, Download } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoStyles } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const user = await currentUser();
  
  if (!user) {
    return <div>Please log in</div>;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: videos, error } = await supabase
    .from('video_series')
    .select('*')
    .eq('user_id', user.id)
    .neq('status', 'scheduled') // Only show active/completed/processing? Or all.
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

      {!videos || videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed rounded-xl bg-card/50">
             <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
                 <Play className="h-8 w-8 text-muted-foreground" />
             </div>
             <h3 className="text-lg font-semibold">No videos yet</h3>
             <p className="text-muted-foreground">Generated videos will appear here.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => {
                  const style = VideoStyles.find(s => s.id === video.video_style);
                  return (
                      <Card key={video.id} className="overflow-hidden group">
                          <div className="relative aspect-[9/16] bg-muted">
                              {style?.image ? (
                                  <Image 
                                      src={style.image} 
                                      alt={video.series_name} 
                                      fill 
                                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                  />
                              ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                      <Play className="h-10 w-10 text-white/50" />
                                  </div>
                              )}
                              
                              {/* Overlay Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                  <Button size="icon" className="h-12 w-12 rounded-full text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40">
                                      <Play className="h-5 w-5 fill-current" />
                                  </Button>
                              </div>
                              
                              <Badge className="absolute top-2 left-2 uppercase text-[10px]" variant={video.status === 'completed' ? 'default' : 'secondary'}>
                                  {video.status}
                              </Badge>
                          </div>
                          
                          <CardContent className="p-4">
                              <h3 className="font-bold line-clamp-1 mb-1">{video.series_name}</h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(video.created_at).toLocaleDateString()}</span>
                                  <span>•</span>
                                  <span>{video.video_duration}s</span>
                              </div>
                          </CardContent>
                          
                          <CardFooter className="p-4 pt-0">
                               <Button variant="outline" size="sm" className="w-full gap-2">
                                   <Download className="h-3.5 w-3.5" />
                                   Download
                               </Button>
                          </CardFooter>
                      </Card>
                  );
              })}
          </div>
      )}
    </div>
  );
}
