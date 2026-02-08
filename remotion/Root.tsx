import React from 'react';
import { Composition } from 'remotion';
import { MainComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="MainVideo"
                component={MainComposition}
                durationInFrames={1} // Will be overridden during render
                fps={30}
                width={1080}
                height={1920}
                defaultProps={{
                    scenes: [],
                    captionStyle: 'classic-bold'
                }}
            />
        </>
    );
};
