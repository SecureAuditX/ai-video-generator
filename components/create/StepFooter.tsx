import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepFooterProps {
    onBack: () => void;
    onNext: () => void;
    isBackDisabled?: boolean;
    isNextDisabled?: boolean;
    nextLabel?: string;
    backLabel?: string;
}

export function StepFooter({ 
    onBack, 
    onNext, 
    isBackDisabled = false, 
    isNextDisabled = false,
    nextLabel = "Continue",
    backLabel = "Back"
}: StepFooterProps) {
    return (
        <div className="flex justify-between pt-4 border-t mt-4">
            <Button 
                variant="outline" 
                onClick={onBack} 
                disabled={isBackDisabled}
                className={isBackDisabled ? "invisible" : ""}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backLabel}
            </Button>
            
            <Button 
                onClick={onNext} 
                disabled={isNextDisabled}
                className="gap-2"
            >
                {nextLabel}
                <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
