import React from 'react';
import { 
    AbsoluteFill, 
    Sequence, 
    Audio, 
    useVideoConfig,
    useCurrentFrame,
    interpolate
} from 'remotion';
import { ImageLayer } from './components/ImageLayer';
import { CaptionLayer } from './components/CaptionLayer';

export interface Caption {
    text: string;
    start: number; // in seconds
    end: number;   // in seconds
}

export interface Scene {
    image_url: string;
    audio_url: string;
    durationInFrames: number;
    animationType: 'zoom-in' | 'zoom-out' | 'slide-up' | 'slide-down' | 'fade-in';
    captions: Caption[];
}

interface Props {
    scenes: Scene[];
    captionStyleId: string;
}

export const MainComposition: React.FC<Props> = ({ scenes, captionStyleId }) => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {scenes.map((scene, index) => {
                const previousScenesDuration = scenes
                    .slice(0, index)
                    .reduce((acc, s) => acc + s.durationInFrames, 0);

                return (
                    <Sequence
                        key={index}
                        from={previousScenesDuration}
                        durationInFrames={scene.durationInFrames}
                    >
                        <ImageLayer 
                            src={scene.image_url} 
                            animationType={scene.animationType} 
                        />
                        <Audio src={scene.audio_url} />
                        <CaptionLayer 
                            captions={scene.captions} 
                            styleId={captionStyleId} 
                        />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
