"use client";

import { VideoStyles } from "@/lib/constants";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Edit,
  Pause,
  Play,
  Trash2,
  Calendar,
  Sparkles,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface SeriesCardProps {
  series: any; // Using any for now to simplify, ideally use a proper type
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

export function SeriesCard({
  series,
  onDelete,
  onStatusChange,
}: SeriesCardProps) {
  const router = useRouter();
  const style = VideoStyles.find((s) => s.id === series.video_style);
  const [isHovered, setIsHovered] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEdit = () => {
    router.push(`/dashboard/create?edit=${series.id}`);
  };

  const handlePauseResume = async () => {
    const newStatus = series.status === "paused" ? "scheduled" : "paused";
    if (onStatusChange) {
      onStatusChange(series.id, newStatus);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this series?")) {
      if (onDelete) {
        onDelete(series.id);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case "paused":
        return <Pause className="h-3 w-3 text-amber-500" />;
      case "scheduled":
        return <Clock className="h-3 w-3 text-blue-500" />;
      case "error":
        return <AlertCircle className="h-3 w-3 text-destructive" />;
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/video/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seriesId: series.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Generation trigger failed:", errorData);
        throw new Error(errorData.details || "Failed to trigger generation");
      }

      const data = await response.json();
      console.log("Generation triggered successfully:", data);

      import("sonner").then(({ toast }) => {
        toast.success("Generation started!", {
          description: "Redirecting to your video library...",
        });
      });

      // Navigate to videos page with generating status
      router.push(`/dashboard/videos?generating=true&seriesId=${series.id}`);
    } catch (error: any) {
      console.error("Error in handleGenerate:", error);
      import("sonner").then(({ toast }) => {
        toast.error("Failed to start generation", {
          description: error.message,
        });
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card
      className="group relative overflow-hidden border border-white/5 bg-card/50 backdrop-blur-xl shadow-2xl hover:border-primary/50 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Thumbnail Area */}
      <div className="relative aspect-[9/16] overflow-hidden bg-muted">
        {style?.image ? (
          <Image
            src={style.image}
            alt={series.series_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full gap-2 font-semibold"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
            Edit Series
          </Button>
        </div>

        {/* Edit Icon on top right */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>

        {/* Status Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
          {getStatusIcon(series.status)}
          {series.status}
        </div>
      </div>

      {/* Content Area */}
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {series.series_name}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleEdit}
                className="gap-2 cursor-pointer"
              >
                <Edit className="h-4 w-4 text-blue-500" />
                <span>Edit Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handlePauseResume}
                className="gap-2 cursor-pointer"
              >
                {series.status === "paused" ? (
                  <>
                    <Play className="h-4 w-4 text-green-500" />
                    <span>Resume Series</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 text-amber-500" />
                    <span>Pause Series</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className="gap-2 cursor-pointer text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Series</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>
            Created{" "}
            {formatDistanceToNow(new Date(series.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-[11px] gap-1.5 h-8 font-semibold"
          onClick={() => router.push('/dashboard/videos')}
        >
          <Eye className="h-3.5 w-3.5" />
          Videos
        </Button>
        <Button
          size="sm"
          className="w-full text-[11px] gap-1.5 h-8 font-semibold shadow-sm"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              Generate
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
