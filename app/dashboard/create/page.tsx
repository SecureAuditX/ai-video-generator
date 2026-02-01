"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateStepper } from "@/components/create/CreateStepper";
import { NicheSelection } from "@/components/create/NicheSelection";
import { LanguageVoiceSelection } from "@/components/create/LanguageVoiceSelection";
import { BackgroundMusicSelection } from "@/components/create/BackgroundMusicSelection";
import { VideoStyleSelection } from "@/components/create/VideoStyleSelection";
import { CaptionStyleSelection } from "@/components/create/CaptionStyleSelection";
import { SeriesDetailsForm } from "@/components/create/SeriesDetailsForm";
import { StepFooter } from "@/components/create/StepFooter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function CreateSeriesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(!!editId);
    const [formData, setFormData] = useState({
        niche: "",
        language: "",
        voice: "",
        backgroundMusic: [] as string[],
        videoStyle: "",
        captionStyle: "",
        // Step 6 fields
        seriesName: "",
        videoDuration: "",
        platform: "",
        publishTime: "",
    });

    useEffect(() => {
        if (editId) {
            const fetchSeriesData = async () => {
                try {
                    const response = await fetch(`/api/video-series/${editId}`);
                    const seriesToEdit = await response.json();
                    
                    if (seriesToEdit) {
                        setFormData({
                            niche: seriesToEdit.niche,
                            language: seriesToEdit.language,
                            voice: seriesToEdit.voice,
                            backgroundMusic: seriesToEdit.background_music,
                            videoStyle: seriesToEdit.video_style,
                            captionStyle: seriesToEdit.caption_style,
                            seriesName: seriesToEdit.series_name,
                            videoDuration: seriesToEdit.video_duration,
                            platform: seriesToEdit.platform,
                            publishTime: seriesToEdit.publish_time ? new Date(seriesToEdit.publish_time).toISOString().slice(0, 16) : "",
                        });
                    }
                } catch (error) {
                    console.error("Error fetching series to edit:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSeriesData();
        }
    }, [editId]);

    const totalSteps = 6;

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return !!formData.niche;
            case 2:
                return !!formData.language && !!formData.voice;
            case 3:
                return formData.backgroundMusic.length > 0;
            case 4:
                return !!formData.videoStyle;
            case 5:
                return !!formData.captionStyle;
            case 6:
                return !!formData.seriesName && !!formData.videoDuration && !!formData.platform && !!formData.publishTime;
            default:
                return true;
        }
    };

    const handleSchedule = async () => {
        try {
            console.log('Scheduling video series with data:', formData);
            
            const url = editId ? `/api/video-series/${editId}` : '/api/video-series';
            const method = editId ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to schedule video series');
            }

            const data = await response.json();
            console.log('Successfully scheduled:', data);
            
            // Redirect to dashboard on success
            router.push('/dashboard');
            router.refresh(); // Refresh dashboard data
        } catch (error) {
            console.error('Error scheduling series:', error);
            // In a real app, you'd show a toast error here
            alert(error instanceof Error ? error.message : 'An error occurred while scheduling');
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground font-medium">Loading series details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-4 py-4">
            <div className="flex items-center justify-between">
                <Link href="/dashboard" className="group">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="font-semibold">Dashboard</span>
                    </Button>
                </Link>
                <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                    {editId ? 'Edit Video Series' : 'Create New Series'}
                </div>
            </div>

            <CreateStepper currentStep={currentStep} totalSteps={totalSteps} />
            
            <div className="mt-4">
                {currentStep === 1 && (
                    <NicheSelection 
                        value={formData.niche}
                        onSelect={(niche) => setFormData({ ...formData, niche })} 
                    />
                )}

                {currentStep === 2 && (
                    <LanguageVoiceSelection 
                        language={formData.language}
                        voice={formData.voice}
                        onUpdate={(data) => setFormData({ ...formData, ...data })}
                    />
                )}

                {currentStep === 3 && (
                    <BackgroundMusicSelection 
                        selectedMusic={formData.backgroundMusic}
                        onUpdate={(musicIds) => setFormData({ ...formData, backgroundMusic: musicIds })}
                    />
                )}

                {currentStep === 4 && (
                    <VideoStyleSelection 
                        selectedStyle={formData.videoStyle}
                        onSelect={(styleId) => setFormData({ ...formData, videoStyle: styleId })}
                    />
                )}

                {currentStep === 5 && (
                    <CaptionStyleSelection 
                        selectedStyle={formData.captionStyle}
                        onSelect={(styleId) => setFormData({ ...formData, captionStyle: styleId })}
                    />
                )}

                {currentStep === 6 && (
                    <SeriesDetailsForm 
                        seriesName={formData.seriesName}
                        videoDuration={formData.videoDuration}
                        platform={formData.platform}
                        publishTime={formData.publishTime}
                        onUpdate={(data) => setFormData({ ...formData, ...data })}
                        onSchedule={handleSchedule}
                        isValid={isStepValid()}
                    />
                )}
                
                {/* Step Footer - Hide on step 6 as it has its own Schedule button */}
                {currentStep < 6 && (
                    <StepFooter 
                        onBack={handleBack}
                        onNext={handleNext}
                        isBackDisabled={currentStep === 1}
                        isNextDisabled={!isStepValid()}
                    />
                )}

                {/* Back button for step 6 */}
                {currentStep === 6 && (
                    <div className="flex justify-start mt-4">
                        <Button 
                            variant="outline" 
                            onClick={handleBack}
                            className="gap-2"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="m12 19-7-7 7-7"/>
                                <path d="M19 12H5"/>
                            </svg>
                            Back to Caption Style
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
