"use client";

import { useState, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Check, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Languages, DeepgramVoices, FonadalabVoices } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LanguageVoiceSelectionProps {
    language: string;
    voice: string;
    onUpdate: (data: { language?: string; voice?: string }) => void;
}

export function LanguageVoiceSelection({ language, voice, onUpdate }: LanguageVoiceSelectionProps) {
    const [playingVoice, setPlayingVoice] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const selectedLanguage = Languages.find(l => l.name === language);
    
    // Determine which voices to show based on selected language model
    const availableVoices = selectedLanguage?.modelName === "deepgram" 
        ? DeepgramVoices 
        : selectedLanguage?.modelName === "fonadalab" 
            ? FonadalabVoices 
            : []; // Default empty or fallback

    const handlePlayPreview = (e: React.MouseEvent, voiceId: string, previewUrl: string) => {
        e.stopPropagation(); // Prevent card selection when clicking play

        if (playingVoice === voiceId) {
            audioRef.current?.pause();
            setPlayingVoice(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            // Note: In a real app, ensure these files exist in /public or provide a valid URL
            const audio = new Audio(`/voice/${previewUrl}`); 
            audioRef.current = audio;
            audio.play().catch(err => console.error("Audio playback failed:", err));
            audio.onended = () => setPlayingVoice(null);
            setPlayingVoice(voiceId);
        }
    };

    const handleLanguageChange = (val: string) => {
        // Find if the new language uses a different model, if so clear the voice selection
        const newLang = Languages.find(l => l.name === val);
        const shouldResetVoice = newLang?.modelName !== selectedLanguage?.modelName;

        onUpdate({ 
            language: val, 
            voice: shouldResetVoice ? "" : voice 
        });
    };

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Language & Voice</h2>
                <p className="text-sm text-muted-foreground">Select the language and AI voice for your video.</p>
            </div>

            <div className="max-w-md mx-auto space-y-2">
                <label className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Select Language
                </label>
                <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="h-10 border-primary/20 bg-muted/20 text-sm">
                        <SelectValue placeholder="Choose a language" />
                    </SelectTrigger>
                    <SelectContent>
                        {Languages.map((lang) => (
                            <SelectItem key={lang.modelLangCode} value={lang.name}>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {language && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-base">Select Voice</h3>
                    </div>
                    
                    <ScrollArea className="h-[250px] w-full rounded-xl border bg-muted/10 p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableVoices.length > 0 ? (
                                availableVoices.map((v) => {
                                    const isSelected = voice === v.id;
                                    const isPlaying = playingVoice === v.id;

                                    return (
                                        <Card 
                                            key={v.id}
                                            className={cn(
                                                "cursor-pointer transition-all hover:border-primary/50 relative overflow-hidden group",
                                                isSelected && "border-primary ring-1 ring-primary bg-primary/5"
                                            )}
                                            onClick={() => onUpdate({ voice: v.id })}
                                        >
                                            <div className="absolute top-0 right-0 p-3">
                                                {isSelected && (
                                                    <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-sm">
                                                        <Check className="h-3 w-3" />
                                                    </div>
                                                )}
                                            </div>

                                            <CardContent className="p-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                                                        isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                                                    )}>
                                                        <span className="text-base font-bold">{v.name[0]}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm">{v.name}</p>
                                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                            <span className="capitalize">{v.gender}</span>
                                                            <span>•</span>
                                                            <span className="uppercase">{v.model}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                                                    onClick={(e) => handlePlayPreview(e, v.id, v.preview)}
                                                >
                                                    {isPlaying ? (
                                                        <Pause className="h-5 w-5 fill-current" />
                                                    ) : (
                                                        <Play className="h-5 w-5 fill-current ml-0.5" />
                                                    )}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="col-span-full h-32 flex flex-col items-center justify-center text-muted-foreground">
                                    <p>No voices available for this language yet.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </div>
    );
}
