import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();
  const userName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  return (
    <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-8 border shadow-sm">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground mb-8">
                Welcome back{userName ? `, ${userName}` : ''}!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold mb-2">My Videos</h3>
                    <p className="text-sm text-muted-foreground">Manage your generated videos</p>
                </div>
                <div className="p-6 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold mb-2">Create New</h3>
                    <p className="text-sm text-muted-foreground">Generate a new AI video</p>
                </div>
                <div className="p-6 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold mb-2">Settings</h3>
                    <p className="text-sm text-muted-foreground">Update your preferences</p>
                </div>
            </div>
        </div>
    </div>
  );
}
