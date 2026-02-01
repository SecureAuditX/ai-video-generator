import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Video, Calendar, Clock, MoreVertical, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function VideosPage() {
  const user = await currentUser();
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const { data: videos, error } = await supabase
    .from('video_series')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'generating': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'scheduled': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Video Series</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your AI-generated video series.
          </p>
        </div>
        <Button className="gap-2">
            <Video size={18} />
            Generate New
        </Button>
      </div>

      {(!videos || videos.length === 0) ? (
        <Card className="border-2 border-dashed bg-gray-50/50">
          <CardContent className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center shadow-sm text-gray-400">
              <Video size={40} />
            </div>
            <div className="space-y-2 max-w-sm">
                <h3 className="text-xl font-bold text-gray-900">No available generate video yet.</h3>
                <p className="text-gray-500">
                    You haven&apos;t created any video series yet. Start generating high-quality AI videos in minutes.
                </p>
            </div>
            <Button size="lg" className="mt-4 px-8">
                Start Creating
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden border-2 hover:border-primary/20 transition-all flex flex-col">
              <div className="aspect-video bg-gray-100 relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                   <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                     <Play fill="currentColor" size={24} />
                   </div>
                </div>
                <div className="absolute top-3 left-3 z-20">
                    <Badge className={getStatusColor(video.status || 'scheduled')}>
                        {video.status || 'scheduled'}
                    </Badge>
                </div>
                <div className="absolute bottom-3 right-3 z-20">
                    <div className="bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded text-[10px] font-bold">
                        {video.video_duration}s
                    </div>
                </div>
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Video size={48} className="text-gray-300" />
                </div>
              </div>
              
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg leading-tight truncate max-w-[200px]">
                      {video.series_name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <span className="uppercase">{video.platform}</span> • {video.niche}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Scheduled for</span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <Calendar size={12} className="text-primary" />
                      {new Date(video.publish_time).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Created at</span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                      <Clock size={12} className="text-gray-400" />
                      {new Date(video.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
