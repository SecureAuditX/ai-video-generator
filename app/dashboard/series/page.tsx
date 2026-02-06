import { createClient } from "@supabase/supabase-js";
import { currentUser } from "@clerk/nextjs/server";
import { SeriesList } from "@/components/dashboard/SeriesList";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function SeriesPage() {
  const user = await currentUser();
  
  if (!user) {
    return <div>Please log in</div>;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: series, error } = await supabase
    .from('video_series')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching series:", error);
  }

  return (
    <div className="container mx-auto max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Series</h1>
          <p className="text-muted-foreground mt-1">
            Manage your AI-generated video collections.
          </p>
        </div>
        
        <Button asChild size="lg" className="shadow-lg shadow-primary/20">
          <Link href="/dashboard/create">
            <Plus className="mr-2 h-5 w-5" />
            Create New Series
          </Link>
        </Button>
      </div>

      <SeriesList initialSeries={series || []} />
    </div>
  );
}
