"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Play, Calendar, Download, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Video {
  id: string;
  title: string;
  status: string;
  created_at: string;
  script: any;
}

interface VideoListProps {
  initialVideos: Video[];
  userId: string;
}

export function VideoList({ initialVideos, userId }: VideoListProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Poll for status updates every 5 seconds if there are processing videos
    const hasProcessing = videos.some(v => v.status === 'processing');
    
    if (hasProcessing) {
        const interval = setInterval(async () => {
            const { data, error } = await supabase
                .from('generated_videos')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (data && !error) {
                setVideos(data);
                // If no more are processing, we can clear the interval (handled by effect re-run)
            }
        }, 5000);

        return () => clearInterval(interval);
    }
  }, [videos, userId, supabase]);

  if (videos.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed rounded-xl bg-card/50">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Play className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No videos yet</h3>
            <p className="text-muted-foreground">Generated videos will appear here.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => {
        const isProcessing = video.status === 'processing';
        const firstScene = video.script?.scenes?.[0];
        const thumbnail = firstScene?.image_url;

        return (
          <Card key={video.id} className={`overflow-hidden group hover:border-primary/50 transition-colors ${isProcessing ? 'border-primary/30 bg-primary/5 animate-pulse' : ''}`}>
            <div className="relative aspect-[9/16] bg-muted">
              {isProcessing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted/50">
                    <div className="relative">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-bounce" />
                    </div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Generating...</p>
                </div>
              ) : thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <Play className="h-10 w-10 text-white/50" />
                </div>
              )}

              {/* Overlay Play Button (only for completed) */}
              {!isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <Button size="icon" className="h-12 w-12 rounded-full text-white bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/40">
                    <Play className="h-5 w-5 fill-current" />
                  </Button>
                </div>
              )}

              <Badge 
                className={`absolute top-2 left-2 uppercase text-[10px] ${isProcessing ? 'bg-primary/20 text-primary border-primary/30' : ''}`} 
                variant={video.status === 'completed' ? 'default' : 'secondary'}
              >
                {video.status}
              </Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold line-clamp-1 mb-1">{video.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{new Date(video.created_at).toLocaleDateString()}</span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button disabled={isProcessing} variant="outline" size="sm" className="w-full gap-2">
                {isProcessing ? (
                    <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Download className="h-3.5 w-3.5" />
                        Download
                    </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
