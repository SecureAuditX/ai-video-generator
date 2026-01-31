"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
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
  { icon: LayoutList, label: "Series", href: "/dashboard/series" },
  { icon: Video, label: "Videos", href: "/dashboard/videos" },
  { icon: BookOpen, label: "Guides", href: "/dashboard/guides" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col border-r bg-white w-64 fixed left-0 top-0 z-30">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 mb-8">
          <Image src="/logo.png" alt="Zynova Logo" width={32} height={32} className="rounded-md" />
          <span className="text-xl font-bold text-gray-900">Zynova</span>
        </Link>
        
        <Button asChild className="w-full justify-start gap-2 h-12 text-base font-semibold shadow-md mb-6" size="lg">
          <Link href="/dashboard/create">
            <Plus className="h-5 w-5" />
            Create New Series
          </Link>
        </Button>

        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors hover:bg-gray-100/80 text-gray-700",
                  isActive && "bg-gray-100 text-primary font-semibold"
                )}
              >
                <Icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-gray-500")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100 space-y-2">
        <Link
            href="/dashboard/upgrade"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors hover:bg-gray-100/80 text-gray-700"
        >
            <Sparkles className="h-6 w-6 text-amber-500" />
            Upgrade
        </Link>
        <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors hover:bg-gray-100/80 text-gray-700"
        >
            <User className="h-6 w-6 text-gray-500" />
            Profile
        </Link>
      </div>
    </div>
  );
}
