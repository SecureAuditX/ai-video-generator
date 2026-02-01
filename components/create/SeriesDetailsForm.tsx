"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Rocket, Video, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeriesDetailsFormProps {
    seriesName: string;
    videoDuration: string;
    platform: string;
    publishTime: string;
    onUpdate: (data: {
        seriesName?: string;
        videoDuration?: string;
        platform?: string;
        publishTime?: string;
    }) => void;
    onSchedule: () => void;
    isValid: boolean;
}

const PLATFORMS = [
    {
        id: "tiktok",
        name: "TikTok",
        icon: "📱",
        color: "from-cyan-500 to-pink-500"
    },
    {
        id: "youtube",
        name: "YouTube",
        icon: "▶️",
        color: "from-red-500 to-red-600"
    },
    {
        id: "instagram",
        name: "Instagram",
        icon: "📷",
        color: "from-purple-500 to-pink-500"
    },
    {
        id: "email",
        name: "Email",
        icon: "✉️",
        color: "from-blue-500 to-blue-600"
    }
];

const VIDEO_DURATIONS = [
    {
        value: "30-50",
        label: "30-50 seconds",
        description: "Quick, engaging content"
    },
    {
        value: "60-70",
        label: "60-70 seconds",
        description: "Detailed storytelling"
    }
];

export function SeriesDetailsForm({
    seriesName,
    videoDuration,
    platform,
    publishTime,
    onUpdate,
    onSchedule,
    isValid
}: SeriesDetailsFormProps) {
    const [isScheduling, setIsScheduling] = useState(false);

    const handleSchedule = async () => {
        setIsScheduling(true);
        try {
            await onSchedule();
        } finally {
            setIsScheduling(false);
        }
    };

    // Get minimum datetime (current time + 4 hours to allow for generation time)
    const getMinDateTime = () => {
        const now = new Date();
        now.setHours(now.getHours() + 4);
        return now.toISOString().slice(0, 16);
    };

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Series Details</h2>
                <p className="text-sm text-muted-foreground">
                    Configure your video series settings and schedule publication.
                </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
                {/* Series Name */}
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Video className="h-4 w-4 text-primary" />
                            <Label htmlFor="seriesName" className="text-sm font-semibold">
                                Series Name *
                            </Label>
                        </div>
                        <Input
                            id="seriesName"
                            placeholder="Enter your video series name..."
                            value={seriesName}
                            onChange={(e) => onUpdate({ seriesName: e.target.value })}
                            className="h-10 text-sm"
                        />
                    </CardContent>
                </Card>

                {/* Video Duration */}
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <Label className="text-sm font-semibold">
                                Video Duration *
                            </Label>
                        </div>
                        <Select value={videoDuration} onValueChange={(val) => onUpdate({ videoDuration: val })}>
                            <SelectTrigger className="h-10 text-sm">
                                <SelectValue placeholder="Select video duration" />
                            </SelectTrigger>
                            <SelectContent>
                                {VIDEO_DURATIONS.map((duration) => (
                                    <SelectItem key={duration.value} value={duration.value}>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{duration.label}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {duration.description}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Platform Selection */}
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-primary" />
                            <Label className="text-sm font-semibold">
                                Platform *
                            </Label>
                        </div>
                        <Select value={platform} onValueChange={(val) => onUpdate({ platform: val })}>
                            <SelectTrigger className="h-10 text-sm">
                                <SelectValue placeholder="Select target platform" />
                            </SelectTrigger>
                            <SelectContent>
                                {PLATFORMS.map((plat) => (
                                    <SelectItem key={plat.id} value={plat.id}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{plat.icon}</span>
                                            <span className="font-medium">{plat.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        {/* Platform Preview Pills */}
                        {platform && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {PLATFORMS.filter(p => p.id === platform).map((p) => (
                                    <div
                                        key={p.id}
                                        className={cn(
                                            "px-3 py-1 rounded-full bg-gradient-to-r text-white text-[10px] font-medium animate-in zoom-in duration-200",
                                            p.color
                                        )}
                                    >
                                        <span className="mr-1.5">{p.icon}</span>
                                        {p.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Publish Time */}
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4 text-primary" />
                            <Label htmlFor="publishTime" className="text-sm font-semibold">
                                Publish Time *
                            </Label>
                        </div>
                        <Input
                            id="publishTime"
                            type="datetime-local"
                            value={publishTime}
                            onChange={(e) => onUpdate({ publishTime: e.target.value })}
                            min={getMinDateTime()}
                            className="h-10 text-sm"
                        />
                        
                        {/* Important Note */}
                        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2 mt-2">
                            <div className="flex gap-2">
                                <Info className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 text-[10px] text-amber-800 dark:text-amber-300">
                                    Video generate 3-6 hours before video publish.
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Button */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-4">
                        <Button
                            onClick={handleSchedule}
                            disabled={!isValid || isScheduling}
                            className="w-full h-12 text-base font-semibold"
                            size="lg"
                        >
                            {isScheduling ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                    Scheduling...
                                </>
                            ) : (
                                <>
                                    <Rocket className="mr-2 h-4 w-4" />
                                    Schedule Video Series
                                </>
                            )}
                        </Button>
                                
                        {!isValid && (
                            <p className="text-[10px] text-center text-muted-foreground mt-2">
                                Please fill in all required fields to schedule
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Summary Card if all fields filled */}
                {isValid && (
                    <Card className="bg-primary/5 border-primary/20 animate-in slide-in-from-bottom-2 duration-300">
                        <CardContent className="p-3">
                            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <Video className="h-3 w-3 text-primary" />
                                Series Summary
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Name:</span>
                                    <span className="font-medium truncate ml-1">{seriesName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Duration:</span>
                                    <span className="font-medium">
                                        {VIDEO_DURATIONS.find(d => d.value === videoDuration)?.label}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Platform:</span>
                                    <span className="font-medium uppercase">
                                        {platform}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Publish:</span>
                                    <span className="font-medium">
                                        {publishTime ? new Date(publishTime).toLocaleDateString() : 'Not set'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
