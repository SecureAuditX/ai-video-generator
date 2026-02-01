"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoStyles } from "@/lib/constants";
import Image from "next/image";

interface VideoStyleSelectionProps {
    selectedStyle: string;
    onSelect: (styleId: string) => void;
}

export function VideoStyleSelection({ selectedStyle, onSelect }: VideoStyleSelectionProps) {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (styleId: string) => {
        setImageErrors(prev => ({ ...prev, [styleId]: true }));
    };

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Video Style</h2>
                <p className="text-sm text-muted-foreground">
                    Choose the visual style for your video content.
                </p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-base">Available Styles</h3>
                </div>

                {/* Horizontal Scrollable Container */}
                <div className="relative">
                    <div className="overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
                        <div className="flex gap-4 px-2 min-w-max">
                            {VideoStyles.map((style) => {
                                const isSelected = selectedStyle === style.id;
                                const hasError = imageErrors[style.id];

                                return (
                                    <Card
                                        key={style.id}
                                        className={cn(
                                            "cursor-pointer transition-all hover:scale-105 relative flex-shrink-0 group",
                                            "w-[160px] hover:shadow-lg",
                                            isSelected && "ring-2 ring-primary shadow-lg scale-105"
                                        )}
                                        onClick={() => onSelect(style.id)}
                                    >
                                        {/* Selection Indicator */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1 shadow-md animate-in zoom-in duration-200">
                                                <Check className="h-3 w-3" />
                                            </div>
                                        )}

                                        <CardContent className="p-0">
                                            {/* 9:16 Aspect Ratio Container */}
                                            <div className="relative w-full aspect-[9/16] bg-muted rounded-t-lg overflow-hidden">
                                                {!hasError ? (
                                                    <Image
                                                        src={style.image}
                                                        alt={style.name}
                                                        fill
                                                        className={cn(
                                                            "object-cover transition-transform duration-300",
                                                            "group-hover:scale-110"
                                                        )}
                                                        onError={() => handleImageError(style.id)}
                                                        sizes="240px"
                                                        priority
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-muted">
                                                        <Video className="h-12 w-12 text-muted-foreground/50" />
                                                    </div>
                                                )}
                                                
                                                {/* Gradient Overlay on Hover */}
                                                <div className={cn(
                                                    "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
                                                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                )} />
                                            </div>

                                            {/* Style Info */}
                                            <div className={cn(
                                                "p-3 border-t transition-colors",
                                                isSelected ? "bg-primary/5 border-primary" : "bg-background"
                                            )}>
                                                <h4 className={cn(
                                                    "font-semibold text-sm mb-0.5 transition-colors truncate",
                                                    isSelected && "text-primary"
                                                )}>
                                                    {style.name}
                                                </h4>
                                                <p className="text-[10px] text-muted-foreground line-clamp-1">
                                                    {style.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Scroll Hint - Shows on initial load */}
                    <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                </div>

                {/* Selected Style Info */}
                {selectedStyle && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-2">
                            <div className="bg-primary/10 rounded-full p-1.5 text-primary">
                                <Video className="h-3 w-3" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-medium">Selected Style: <span className="text-primary">{VideoStyles.find(s => s.id === selectedStyle)?.name}</span></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Scroll Instruction */}
            <div className="text-center text-xs text-muted-foreground md:hidden">
                👈 Swipe to see more styles
            </div>
        </div>
    );
}
