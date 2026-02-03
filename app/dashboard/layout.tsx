import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { syncUser } from "@/lib/supabase/sync-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure user is synced when entering any dashboard route
  await syncUser();

  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
