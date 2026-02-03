"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  LayoutList, 
  Video, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Sparkles, 
  User,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: LayoutList, label: "Series", href: "/dashboard/series" },
  { icon: Video, label: "Videos", href: "/dashboard/videos" },
  { icon: BookOpen, label: "Guides", href: "/dashboard/guides" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl w-64 fixed left-0 top-0 z-30">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8">
          <Image src="/logo.png" alt="Zynova Logo" width={32} height={32} className="rounded-md" />
          <span className="text-xl font-bold text-white">Zynova</span>
        </Link>
        
        <Button asChild className="w-full justify-start gap-2 h-12 text-base font-semibold shadow-xl shadow-primary/20 mb-6 bg-primary hover:bg-primary/90 text-white" size="lg">
          <Link href="/dashboard/create">
            <Plus className="h-5 w-5" />
            Create New Series
          </Link>
        </Button>
 
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/dashboard" 
              ? pathname === "/dashboard" 
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all hover:bg-white/5 text-gray-400 hover:text-white",
                  isActive && "bg-white/10 text-white font-semibold"
                )}
              >
                <Icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
 
      <div className="mt-auto p-6 border-t border-white/5 space-y-2">
        <Link
            href="/dashboard/upgrade"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all hover:bg-white/5 text-gray-400 hover:text-white"
        >
            <Sparkles className="h-6 w-6 text-amber-500" />
            Upgrade
        </Link>
        <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all hover:bg-white/5 text-gray-400 hover:text-white"
        >
            <User className="h-6 w-6 text-gray-400" />
            Profile
        </Link>
      </div>
    </div>

  );
}
