"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaptionStyles } from "@/lib/constants";
import { CaptionPreview } from "@/components/captions/CaptionPreview";
import { Badge } from "@/components/ui/badge";

interface CaptionStyleSelectionProps {
    selectedStyle: string;
    onSelect: (styleId: string) => void;
}

export function CaptionStyleSelection({ selectedStyle, onSelect }: CaptionStyleSelectionProps) {
    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Caption Style</h2>
                <p className="text-sm text-muted-foreground">
                    Choose an animated caption style for your video content.
                </p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-base">Available Caption Styles</h3>
                </div>

                {/* Grid Layout for Caption Styles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CaptionStyles.map((style) => {
                        const isSelected = selectedStyle === style.id;

                        return (
                            <Card
                                key={style.id}
                                className={cn(
                                    "cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] relative overflow-hidden group",
                                    isSelected && "ring-2 ring-primary shadow-xl scale-[1.02]"
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
                                    {/* Preview Area with Dark Background */}
                                    <div className={cn(
                                        "relative w-full h-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden",
                                        isSelected && "ring-1 ring-primary ring-inset"
                                    )}>
                                        {/* Animated Caption Preview */}
                                        <CaptionPreview 
                                            style={style}
                                            text="SAMPLE TEXT"
                                            scale={0.35}
                                        />
                                        
                                        {/* Animation Type Badge */}
                                        <div className="absolute bottom-2 left-2">
                                            <Badge 
                                                variant="secondary" 
                                                className="text-xs backdrop-blur-sm bg-black/50 text-white border-white/20"
                                            >
                                                {style.animation}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Style Info */}
                                    <div className={cn(
                                        "p-3 border-t transition-colors",
                                        isSelected ? "bg-primary/5 border-primary" : "bg-background"
                                    )}>
                                        <h4 className={cn(
                                            "font-semibold text-sm mb-0.5 transition-colors",
                                            isSelected && "text-primary"
                                        )}>
                                            {style.name}
                                        </h4>
                                        <p className="text-[10px] text-muted-foreground line-clamp-1">
                                            {style.description}
                                        </p>
                                        
                                        {/* Font Family Info */}
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Type className="h-3 w-3" />
                                            <span className="truncate">
                                                {style.config.fontFamily.replace(/['"]/g, '').split(',')[0]}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Selected Style Info */}
                {selectedStyle && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-2">
                            <div className="bg-primary/10 rounded-full p-1 text-primary">
                                <Type className="h-3 w-3" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-medium">Selected: <span className="text-primary">{CaptionStyles.find(s => s.id === selectedStyle)?.name}</span></p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Note */}
                <div className="bg-muted/50 border rounded-lg p-3 mt-4">
                    <div className="flex gap-2">
                        <div className="text-xl">✨</div>
                        <div className="flex-1">
                            <p className="text-xs font-medium mb-0.5">Live Animation Preview</p>
                            <p className="text-[10px] text-muted-foreground">
                                Each caption style shows a live preview of how it will appear in your videos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
