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
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Video Style</h2>
                <p className="text-muted-foreground">
                    Choose the visual style for your video content.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Available Styles</h3>
                </div>

                {/* Horizontal Scrollable Container */}
                <div className="relative">
                    <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
                        <div className="flex gap-6 px-2 min-w-max">
                            {VideoStyles.map((style) => {
                                const isSelected = selectedStyle === style.id;
                                const hasError = imageErrors[style.id];

                                return (
                                    <Card
                                        key={style.id}
                                        className={cn(
                                            "cursor-pointer transition-all hover:scale-105 relative flex-shrink-0 group",
                                            "w-[240px] hover:shadow-xl",
                                            isSelected && "ring-2 ring-primary shadow-xl scale-105"
                                        )}
                                        onClick={() => onSelect(style.id)}
                                    >
                                        {/* Selection Indicator */}
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-in zoom-in duration-200">
                                                <Check className="h-4 w-4" />
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
                                                "p-4 border-t transition-colors",
                                                isSelected ? "bg-primary/5 border-primary" : "bg-background"
                                            )}>
                                                <h4 className={cn(
                                                    "font-semibold text-base mb-1 transition-colors",
                                                    isSelected && "text-primary"
                                                )}>
                                                    {style.name}
                                                </h4>
                                                <p className="text-xs text-muted-foreground line-clamp-2">
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
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-full p-2">
                                <Video className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Selected Style</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {VideoStyles.find(s => s.id === selectedStyle)?.name}
                                </p>
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
