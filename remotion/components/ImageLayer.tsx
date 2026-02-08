import React from 'react';
import { 
    AbsoluteFill, 
    Img, 
    interpolate, 
    useCurrentFrame, 
    useVideoConfig 
} from 'remotion';

interface Props {
    src: string;
    animationType: 'zoom-in' | 'zoom-out' | 'slide-up' | 'slide-down' | 'fade-in';
}

export const ImageLayer: React.FC<Props> = ({ src, animationType }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    let transform = '';
    let opacity = 1;

    if (animationType === 'zoom-in') {
        const scale = interpolate(frame, [0, durationInFrames], [1, 1.2]);
        transform = `scale(${scale})`;
    } else if (animationType === 'zoom-out') {
        const scale = interpolate(frame, [0, durationInFrames], [1.2, 1]);
        transform = `scale(${scale})`;
    } else if (animationType === 'slide-up') {
        const translateY = interpolate(frame, [0, durationInFrames], [0, -50]);
        transform = `translateY(${translateY}px) scale(1.1)`;
    } else if (animationType === 'slide-down') {
        const translateY = interpolate(frame, [0, durationInFrames], [-50, 0]);
        transform = `translateY(${translateY}px) scale(1.1)`;
    } else if (animationType === 'fade-in') {
        opacity = interpolate(frame, [0, 15], [0, 1]);
    }

    return (
        <AbsoluteFill>
            <Img
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform,
                    opacity
                }}
            />
        </AbsoluteFill>
    );
};
