import React from 'react';
import { 
    AbsoluteFill, 
    useVideoConfig, 
    useCurrentFrame, 
    interpolate, 
    spring 
} from 'remotion';
import { CaptionStyles, CaptionStyle } from '../../lib/constants';

interface Caption {
    text: string;
    start: number;
    end: number;
}

interface Props {
    captions: Caption[];
    styleId: string;
}

export const CaptionLayer: React.FC<Props> = ({ captions, styleId }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    
    // Find style or default to first
    const style: CaptionStyle = CaptionStyles.find(s => s.id === styleId) || CaptionStyles[0];

    // Find current caption
    const currentCaption = captions.find(c => {
        const startFrame = Math.floor(c.start * fps);
        const endFrame = Math.floor(c.end * fps);
        return frame >= startFrame && frame < endFrame;
    });

    if (!currentCaption) return null;

    // Animations
    const startFrame = Math.floor(currentCaption.start * fps);
    const progress = frame - startFrame;
    
    let animationStyle: React.CSSProperties = {};
    
    if (style.animation === 'fade-up') {
        const opacity = interpolate(progress, [0, 5], [0, 1]);
        const translateY = interpolate(progress, [0, 5], [20, 0]);
        animationStyle = { opacity, transform: `translateY(${translateY}px)` };
    } else if (style.animation === 'zoom') {
        const scale = spring({
            frame: progress,
            fps,
            config: { damping: 12 }
        });
        animationStyle = { transform: `scale(${scale})` };
    } else if (style.animation === 'slide-in') {
        const translateX = interpolate(progress, [0, 5], [-50, 0]);
        const opacity = interpolate(progress, [0, 5], [0, 1]);
        animationStyle = { opacity, transform: `translateX(${translateX}px)` };
    } else if (style.animation === 'bounce') {
        const translateY = spring({
            frame: progress,
            fps,
            config: { mass: 0.5, damping: 10 }
        });
        animationStyle = { transform: `translateY(${(1 - translateY) * -20}px)` };
    }

    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: height * 0.2, // Position at bottom 20%
        }}>
            <div
                style={{
                    ...style.config,
                    ...(animationStyle as any),
                    fontFamily: style.config.fontFamily.replace(/var\(--font-[^)]+\),\s*/, ''), // Strip CSS vars for Remotion
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width * 0.8,
                    textAlign: style.config.textAlign as any,
                }}
            >
                {currentCaption.text}
            </div>
        </AbsoluteFill>
    );
};
