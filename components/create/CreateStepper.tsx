import {cn} from "@/lib/utils";

interface CreateStepperProps {
    currentStep: number;
    totalSteps: number;
}

export function CreateStepper({ currentStep, totalSteps }: CreateStepperProps) {
    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}>
                {Array.from({ length: totalSteps }).map((_, i) => {
                     const stepNum = i + 1;
                     const isActive = stepNum <= currentStep;
                     const isCurrent = stepNum === currentStep;

                     return (
                         <div key={i} className="h-2 rounded-full bg-secondary overflow-hidden">
                             <div 
                                className={cn(
                                    "h-full w-full transition-all duration-500 ease-in-out bg-primary origin-left",
                                    isActive ? "scale-x-100" : "scale-x-0",
                                    isCurrent && "animate-pulse"
                                )}
                             />
                         </div>
                     )
                })}
            </div>
        </div>
    )
}
