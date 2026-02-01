"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Check, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundMusic } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface BackgroundMusicSelectionProps {
    selectedMusic: string[];
    onUpdate: (musicIds: string[]) => void;
}

export function BackgroundMusicSelection({ selectedMusic, onUpdate }: BackgroundMusicSelectionProps) {
    const [playingMusic, setPlayingMusic] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayPreview = (e: React.MouseEvent, musicId: string, musicUrl: string) => {
        e.stopPropagation(); // Prevent card selection when clicking play

        if (playingMusic === musicId) {
            audioRef.current?.pause();
            setPlayingMusic(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(musicUrl);
            audioRef.current = audio;
            audio.play().catch(err => console.error("Audio playback failed:", err));
            audio.onended = () => setPlayingMusic(null);
            setPlayingMusic(musicId);
        }
    };

    const handleToggleMusic = (musicId: string) => {
        if (selectedMusic.includes(musicId)) {
            // Remove from selection
            onUpdate(selectedMusic.filter(id => id !== musicId));
        } else {
            // Add to selection
            onUpdate([...selectedMusic, musicId]);
        }
    };

    // Group music by category for better organization
    const groupedMusic = BackgroundMusic.reduce((acc, music) => {
        if (!acc[music.category]) {
            acc[music.category] = [];
        }
        acc[music.category].push(music);
        return acc;
    }, {} as Record<string, typeof BackgroundMusic>);

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Background Music</h2>
                <p className="text-sm text-muted-foreground">
                    Select one or more background music tracks for your video.
                </p>
                {selectedMusic.length > 0 && (
                    <Badge variant="secondary" className="mt-1 h-5 text-[10px]">
                        {selectedMusic.length} {selectedMusic.length === 1 ? "track" : "tracks"} selected
                    </Badge>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Music2 className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-base">Available Tracks</h3>
                </div>
                
                <ScrollArea className="h-[280px] w-full rounded-xl border bg-muted/10 p-3">
                    <div className="space-y-6">
                        {Object.entries(groupedMusic).map(([category, tracks]) => (
                            <div key={category} className="space-y-3">
                                <div className="flex items-center gap-2 sticky top-0 bg-muted/10 backdrop-blur-sm py-1 z-10">
                                    <Badge variant="outline" className="font-medium text-[10px] py-0">
                                        {category}
                                    </Badge>
                                </div>
                                
                                <div className="space-y-3">
                                    {tracks.map((music) => {
                                        const isSelected = selectedMusic.includes(music.id);
                                        const isPlaying = playingMusic === music.id;

                                        return (
                                            <Card
                                                key={music.id}
                                                className={cn(
                                                    "cursor-pointer transition-all hover:border-primary/50 relative overflow-hidden group",
                                                    isSelected && "border-primary ring-1 ring-primary bg-primary/5"
                                                )}
                                                onClick={() => handleToggleMusic(music.id)}
                                            >
                                                <div className="absolute top-0 right-0 p-2">
                                                    {isSelected && (
                                                        <div className="bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm animate-in zoom-in duration-200">
                                                            <Check className="h-2 w-2" />
                                                        </div>
                                                    )}
                                                </div>

                                                <CardContent className="p-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div
                                                            className={cn(
                                                                "h-10 w-10 rounded-lg flex items-center justify-center transition-all",
                                                                isSelected
                                                                    ? "bg-gradient-to-br from-primary/20 to-primary/10 text-primary"
                                                                    : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                                                            )}
                                                        >
                                                            <Music2 className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-sm md:text-base leading-tight">
                                                                {music.name}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="text-xs px-2 py-0"
                                                                >
                                                                    {music.category}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className={cn(
                                                            "h-10 w-10 rounded-full transition-all flex-shrink-0",
                                                            isPlaying
                                                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                                                : "hover:bg-primary/10 hover:text-primary"
                                                        )}
                                                        onClick={(e) => handlePlayPreview(e, music.id, music.url)}
                                                    >
                                                        {isPlaying ? (
                                                            <Pause className="h-5 w-5 fill-current animate-pulse" />
                                                        ) : (
                                                            <Play className="h-5 w-5 fill-current ml-0.5" />
                                                        )}
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {BackgroundMusic.length === 0 && (
                            <div className="col-span-full h-32 flex flex-col items-center justify-center text-muted-foreground">
                                <Music2 className="h-12 w-12 mb-2 opacity-50" />
                                <p>No background music available yet.</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {selectedMusic.length > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-start gap-2">
                        <div className="bg-primary/10 rounded-full p-2">
                            <Music2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Selected Music</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {selectedMusic.map((id) => {
                                    const music = BackgroundMusic.find(m => m.id === id);
                                    return music?.name;
                                }).join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
