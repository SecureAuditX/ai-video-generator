"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ghost, Zap, BookOpen, Quote, Sparkles, Brain, Briefcase, Heart, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface NicheSelectionProps {
    value: string;
    onSelect: (niche: string) => void;
}

const niches = [
    {
        id: "scary_stories",
        title: "Scary Stories",
        description: "Spooky tales & urban legends.",
        icon: Ghost,
        color: "bg-red-500/10 text-red-500"
    },
    {
        id: "motivational",
        title: "Motivational",
        description: "Inspiring quotes & speeches.",
        icon: Zap,
        color: "bg-yellow-500/10 text-yellow-500"
    },
    {
        id: "facts",
        title: "Fun Facts",
        description: "Mind-blowing facts.",
        icon: Sparkles,
        color: "bg-blue-500/10 text-blue-500"
    },
    {
        id: "history",
        title: "History",
        description: "Historical events explained.",
        icon: BookOpen,
        color: "bg-amber-700/10 text-amber-700"
    },
    {
        id: "philosophy",
        title: "Philosophy",
        description: "Deep thoughts simplified.",
        icon: Brain,
        color: "bg-violet-500/10 text-violet-500"
    },
    {
        id: "business",
        title: "Business",
        description: "Success stories & trends.",
        icon: Briefcase,
        color: "bg-emerald-500/10 text-emerald-500"
    },
    {
        id: "wellness",
        title: "Health",
        description: "Body & mind tips.",
        icon: Heart,
        color: "bg-rose-500/10 text-rose-500"
    },
    {
        id: "quotes",
        title: "Daily Quotes",
        description: "Wisdom from famous people.",
        icon: Quote,
        color: "bg-cyan-500/10 text-cyan-500"
    }
];

export function NicheSelection({ value, onSelect }: NicheSelectionProps) {

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Select Your Video Niche</h2>
                <p className="text-sm text-muted-foreground">Choose a topic for your AI-generated video series.</p>
            </div>

            <Tabs defaultValue="available" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="available">Available Niche</TabsTrigger>
                    <TabsTrigger value="custom">Custom Niche</TabsTrigger>
                </TabsList>
                
                <TabsContent value="available" className="mt-4 space-y-4">
                    <ScrollArea className="h-[280px] w-full rounded-md border p-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {niches.map((niche) => {
                                const Icon = niche.icon;
                                const isSelected = value === niche.id;
                                
                                return (
                                    <Card 
                                        key={niche.id}
                                        className={cn(
                                            "cursor-pointer transition-all hover:border-primary/50 hover:shadow-sm relative",
                                            isSelected && "border-primary ring-1 ring-primary bg-primary/5"
                                        )}
                                        onClick={() => onSelect(niche.id)}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-0.5 animate-in zoom-in-50">
                                                <Check className="h-3 w-3" />
                                            </div>
                                        )}
                                        <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-1 pt-3 px-4">
                                            <div className={cn("p-1.5 rounded-lg", niche.color)}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <CardTitle className="text-sm">{niche.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="px-4 pb-3">
                                            <CardDescription className="text-xs line-clamp-1">{niche.description}</CardDescription>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </TabsContent>
                
                <TabsContent value="custom">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Custom Niche</CardTitle>
                            <CardDescription>
                                Enter a custom topic and we'll generate content based on it.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {/* Placeholder for custom input - can extend later */}
                                <div className="h-20 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground bg-muted/50">
                                    Custom Niche Input Area (Coming Soon)
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
