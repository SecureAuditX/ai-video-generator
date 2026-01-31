import { syncUser } from "@/lib/supabase/sync-user";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";

export default async function DashboardPage() {
  // Sync user to Supabase on access
  const appUser = await syncUser();

  return (
    <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-24 px-4">
            <div className="bg-card rounded-xl p-8 border shadow-sm">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-muted-foreground mb-8">
                    Welcome back{appUser?.name ? `, ${appUser.name}` : ''}!
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                        <h3 className="font-semibold mb-2">My Videos</h3>
                        <p className="text-sm text-muted-foreground">Manage your generated videos</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                        <h3 className="font-semibold mb-2">Create New</h3>
                        <p className="text-sm text-muted-foreground">Generate a new AI video</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                        <h3 className="font-semibold mb-2">Settings</h3>
                        <p className="text-sm text-muted-foreground">Update your preferences</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
