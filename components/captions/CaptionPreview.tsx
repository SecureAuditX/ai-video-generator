"use client";

import { CSSProperties, useMemo } from "react";
import { CaptionStyle } from "@/lib/constants";

interface CaptionPreviewProps {
    style: CaptionStyle;
    text?: string;
    scale?: number;
    className?: string;
}

/**
 * Reusable Caption Preview Component
 * Can be used in the form preview and later adapted for Remotion
 */
export function CaptionPreview({ 
    style, 
    text = "SAMPLE TEXT", 
    scale = 0.35,
    className = "" 
}: CaptionPreviewProps) {
    
    // Generate CSS properties from the caption config
    const captionStyles: CSSProperties = useMemo(() => {
        const baseStyle: CSSProperties = {
            fontFamily: style.config.fontFamily,
            fontSize: style.config.fontSize,
            fontWeight: style.config.fontWeight as any,
            color: style.config.color,
            textTransform: style.config.textTransform as any,
            letterSpacing: style.config.letterSpacing,
            lineHeight: style.config.lineHeight,
            textAlign: style.config.textAlign as any,
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
            display: 'inline-block',
        };

        // Add optional styles
        if (style.config.backgroundColor) {
            baseStyle.backgroundColor = style.config.backgroundColor;
        }
        if (style.config.textShadow) {
            baseStyle.textShadow = style.config.textShadow;
        }
        if (style.config.borderRadius) {
            baseStyle.borderRadius = style.config.borderRadius;
        }
        if (style.config.padding) {
            baseStyle.padding = style.config.padding;
        }
        if (style.config.border) {
            baseStyle.border = style.config.border;
        }
        if (style.config.backgroundImage) {
            baseStyle.backgroundImage = style.config.backgroundImage;
            baseStyle.WebkitBackgroundClip = 'text';
            baseStyle.backgroundClip = 'text';
        }
        if (style.config.WebkitTextStroke) {
            baseStyle.WebkitTextStroke = style.config.WebkitTextStroke;
        }

        return baseStyle;
    }, [style, scale]);

    // Get animation class based on animation type
    const getAnimationClass = () => {
        switch (style.animation) {
            case "fade-up":
                return "animate-caption-fade-up";
            case "slide-in":
                return "animate-caption-slide-in";
            case "bounce":
                return "animate-caption-bounce";
            case "typewriter":
                return "animate-caption-typewriter";
            case "zoom":
                return "animate-caption-zoom";
            case "wave":
                return "animate-caption-wave";
            default:
                return "";
        }
    };

    return (
        <div className={`caption-preview-wrapper ${className}`}>
            <span 
                className={`caption-text ${getAnimationClass()}`}
                style={captionStyles}
            >
                {text}
            </span>
        </div>
    );
}

/**
 * Get caption styles as inline CSS string for Remotion
 * This can be used later when rendering in Remotion
 */
export function getCaptionStylesForRemotion(style: CaptionStyle): Record<string, string | number> {
    const styles: Record<string, string | number> = {
        fontFamily: style.config.fontFamily,
        fontSize: style.config.fontSize,
        fontWeight: style.config.fontWeight,
        color: style.config.color,
    };

    if (style.config.textTransform) styles.textTransform = style.config.textTransform;
    if (style.config.letterSpacing) styles.letterSpacing = style.config.letterSpacing;
    if (style.config.lineHeight) styles.lineHeight = style.config.lineHeight;
    if (style.config.textAlign) styles.textAlign = style.config.textAlign;
    if (style.config.backgroundColor) styles.backgroundColor = style.config.backgroundColor;
    if (style.config.textShadow) styles.textShadow = style.config.textShadow;
    if (style.config.borderRadius) styles.borderRadius = style.config.borderRadius;
    if (style.config.padding) styles.padding = style.config.padding;
    if (style.config.border) styles.border = style.config.border;
    if (style.config.backgroundImage) {
        styles.backgroundImage = style.config.backgroundImage;
        styles.WebkitBackgroundClip = 'text';
        styles.backgroundClip = 'text';
    }
    if (style.config.WebkitTextStroke) styles.WebkitTextStroke = style.config.WebkitTextStroke;

    return styles;
}
