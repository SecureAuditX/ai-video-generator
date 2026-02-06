import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Video, Plus, Calendar, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SeriesList } from "@/components/dashboard/SeriesList";

export default async function DashboardPage() {
  const user = await currentUser();
  const userName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const { data: videos, error } = await supabase
    .from('video_series')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      {/* Hero Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <Video size={300} />
        </div>
        <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
              Welcome back{userName ? `, ${userName}` : ''}!
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
              Your AI-powered video studio is ready. Create, schedule, and automate your content strategy in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                <Link href="/dashboard/create">
                  <Plus className="mr-2 h-6 w-6" />
                  Create New Series
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-bold border-2 hover:bg-muted/50 transition-all">
                <Link href="/dashboard/videos">
                  <Video className="mr-2 h-6 w-6" />
                  Library
                </Link>
              </Button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area - Video Series Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Your Video Series</h2>
                <p className="text-sm text-muted-foreground">Manage and monitor your automated video content.</p>
            </div>
            <Link href="/dashboard/videos" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <SeriesList initialSeries={videos || []} />
        </div>

        {/* Sidebar Space */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-1">Quick Stats</h3>
            <div className="grid gap-4">
                <Card className="border-none shadow-sm bg-blue-50/50 dark:bg-blue-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Video className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{videos?.length || 0}</div>
                            <p className="text-blue-600/70 dark:text-blue-400/70 text-[10px] font-semibold uppercase tracking-tight">Active Series</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-purple-50/50 dark:bg-purple-950/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-purple-900 dark:text-purple-100 truncate max-w-[120px]">
                                {videos?.[0]?.publish_time 
                                    ? new Date(videos[0].publish_time).toLocaleDateString()
                                    : 'None'
                                }
                            </div>
                            <p className="text-purple-600/70 dark:text-purple-400/70 text-[10px] font-semibold uppercase tracking-tight">Next Publish</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>

          {/* Help/Guide Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-xl overflow-hidden relative group">
             <div className="absolute -right-4 -bottom-4 bg-primary/20 h-32 w-32 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
             <CardContent className="p-6 relative z-10">
               <h4 className="font-bold text-lg mb-2">Maximize Growth</h4>
               <p className="text-gray-400 text-xs mb-6 leading-relaxed">Our advanced AI helps you generate high-engagement shorts that trend on TikTok and YouTube.</p>
               <Button asChild size="sm" variant="secondary" className="w-full font-bold h-10">
                 <Link href="/dashboard/guides" className="flex items-center justify-center gap-2">
                   View Strategies <ChevronRight className="h-4 w-4" />
                 </Link>
               </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
