"use client";

import { useState } from "react";
import { CreateStepper } from "@/components/create/CreateStepper";
import { NicheSelection } from "@/components/create/NicheSelection";
import { LanguageVoiceSelection } from "@/components/create/LanguageVoiceSelection";
import { BackgroundMusicSelection } from "@/components/create/BackgroundMusicSelection";
import { VideoStyleSelection } from "@/components/create/VideoStyleSelection";
import { CaptionStyleSelection } from "@/components/create/CaptionStyleSelection";
import { StepFooter } from "@/components/create/StepFooter";

export default function CreateSeriesPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        niche: "",
        language: "",
        voice: "",
        backgroundMusic: [] as string[],
        videoStyle: "",
        captionStyle: "",
        // Add other fields as needed
    });

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
            // Add validation for other steps
            default:
                return true;
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <CreateStepper currentStep={currentStep} totalSteps={totalSteps} />
            
            <div className="mt-8">
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
                
                {/* Placeholders for future steps */}
                 {currentStep > 5 && (
                    <div className="text-center py-20 bg-white rounded-xl border shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">Step {currentStep}</h2>
                        <p className="text-muted-foreground">Work in progress...</p>
                    </div>
                )}
                
                <StepFooter 
                    onBack={handleBack}
                    onNext={handleNext}
                    isBackDisabled={currentStep === 1}
                    isNextDisabled={!isStepValid()}
                />
            </div>
        </div>
    );
}
