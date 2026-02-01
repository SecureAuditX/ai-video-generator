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
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Caption Style</h2>
                <p className="text-muted-foreground">
                    Choose an animated caption style for your video content.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Type className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Available Caption Styles</h3>
                </div>

                {/* Grid Layout for Caption Styles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-in zoom-in duration-200">
                                        <Check className="h-4 w-4" />
                                    </div>
                                )}

                                <CardContent className="p-0">
                                    {/* Preview Area with Dark Background */}
                                    <div className={cn(
                                        "relative w-full h-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden",
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
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-full p-2">
                                <Type className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Selected Caption Style</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {CaptionStyles.find(s => s.id === selectedStyle)?.name} - {' '}
                                    {CaptionStyles.find(s => s.id === selectedStyle)?.animation} animation
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Note */}
                <div className="bg-muted/50 border rounded-lg p-4 mt-6">
                    <div className="flex gap-3">
                        <div className="text-2xl">✨</div>
                        <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Live Animation Preview</p>
                            <p className="text-xs text-muted-foreground">
                                Each caption style shows a live preview of how it will appear in your videos. 
                                The animations loop continuously so you can see the full effect.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
