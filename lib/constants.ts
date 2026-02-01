export const Languages = [
    {
        name: "English",
        countryCode: "US",
        flag: "🇺🇸",
        modelName: "deepgram",
        modelLangCode: "en-US"
    },
    {
        name: "Spanish",
        countryCode: "MX",
        flag: "🇲🇽",
        modelName: "deepgram",
        modelLangCode: "es-MX"
    },
    {
        name: "German",
        countryCode: "DE",
        flag: "🇩🇪",
        modelName: "deepgram",
        modelLangCode: "de-DE"
    }, 
    {
        name: "Hindi",
        countryCode: "IN",
        flag: "🇮🇳",
        modelName: "fonadalab",
        modelLangCode: "hi-IN"
    },
    {
        name: "Marathi",
        countryCode: "IN",
        flag: "🇮🇳",
        modelName: "fonadalab",
        modelLangCode: "mr-IN"
    },
    {
        name: "Telugu",
        countryCode: "IN",
        flag: "🇮🇳",
        modelName: "fonadalab",
        modelLangCode: "te-IN"
    },
    {
        name: "Tamil",
        countryCode: "IN",
        flag: "🇮🇳",
        modelName: "fonadalab",
        modelLangCode: "ta-IN"
    },
    {
        name: "French",
        countryCode: "FR",
        flag: "🇫🇷",
        modelName: "deepgram",
        modelLangCode: "fr-FR"
    },
     {
        name: "Dutch",
        countryCode: "NL",
        flag: "🇳🇱",
        modelName: "deepgram",
        modelLangCode: "nl-NL"
    },
     {
        name: "Italian",
        countryCode: "IT",
        flag: "🇮🇹",
        modelName: "deepgram",
        modelLangCode: "it-IT"
    }
 ];

 export const DeepgramVoices = [
    {
        model: "deepgram",
        name: "Odysseus",
        id: "aura-2-odysseus-en",
        preview: "deepgram-aura-2-odysseus-en.wav",
        gender: "Male"
    },
    {
        model: "deepgram",
        name: "Thalia",
        id: "aura-2-thalia-en",
        preview: "deepgram-aura-2-thalia-en.wav",
        gender: "Female"
    },
    {
        model: "deepgram",
        name: "Amalthea",
        id: "aura-2-amalthea-en",
        preview: "deepgram-aura-2-amalthea-en.wav",
        gender: "Female"
    },
    {
        model: "deepgram",
        name: "Andromeda",
        id: "aura-2-andromeda-en",
        preview: "deepgram-aura-2-andromeda-en.wav",
        gender: "Female",
    }, 
    {
        model: "deepgram",
        name: "Apollo",
        id: "aura-2-apollo-en",
        preview: "deepgram-aura-2-apollo-en.wav",
        gender: "Male"
    }
 ];
          
       
export const FonadalabVoices = [
    {
        model: "fonadalab",
        name: "Vanee",
        id: "vanee",
        preview: "fonadalab-vanee.mp3",
        gender: "Female"
    },
    {
        model: "fonadalab",
        name: "Chitraa",
        id: "chitraa",
        preview: "fonadalab-chitraa.mp3",
        gender: "Female"
    },
    {
        model: "fonadalab",
        name: "Raaga",
        id: "raaga",
        preview: "fonadalab-raaga.mp3",
        gender: "Male"
    },
    {
        model: "fonadalab",
        name: "Nirvani",
        id: "nirvani",
        preview: "fonadalab-niravi.mp3",
        gender: "Female"
    }
];

export const BackgroundMusic = [
    {
        id: "instagram-marketing",
        name: "Instagram Marketing Music",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-469052.mp3",
        category: "Marketing"
    },
    {
        id: "trending-reels",
        name: "Trending Instagram Reels Music",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/trending-instagram-reels-music-447249.mp3",
        category: "Trending"
    },
    {
        id: "instagram-384448",
        name: "Instagram Reels Music (384448)",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-384448.mp3",
        category: "Marketing"
    },
    {
        id: "basketball",
        name: "Basketball Instagram Reels Music",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/basketball-instagram-reels-music-461852.mp3",
        category: "Sports"
    },
    {
        id: "dramatic-hip-hop",
        name: "Dramatic Hip Hop Jazz Music",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/dramatic-hip-hop-music-background-jazz-music-for-short-video-148505.mp3",
        category: "Hip Hop"
    }
];

export const VideoStyles = [
    {
        id: "minimal-text",
        name: "Minimal Text",
        image: "/video-style/2fa905a6720d73c36925beb16831db3b.jpg",
        description: "Clean and minimalist design with focus on text"
    },
    {
        id: "vibrant-dynamic",
        name: "Vibrant & Dynamic",
        image: "/video-style/2fe65d162feed45c352bcdd1c066cb33.jpg",
        description: "Colorful and energetic visual style"
    },
    {
        id: "modern-gradient",
        name: "Modern Gradient",
        image: "/video-style/311053881cb521b555132d6edf7ea8ea.jpg",
        description: "Contemporary gradient effects and smooth transitions"
    },
    {
        id: "professional-corporate",
        name: "Professional Corporate",
        image: "/video-style/45f128e24b0fea5ef38385bb2f94db7d.jpg",
        description: "Professional look suitable for business content"
    },
    {
        id: "creative-artistic",
        name: "Creative & Artistic",
        image: "/video-style/962c0a25068a15b67313a2f1ce2f12b7.jpg",
        description: "Artistic and creative visual presentation"
    },
    {
        id: "bold-impactful",
        name: "Bold & Impactful",
        image: "/video-style/c2c91a2f633d5b6deb8316c7c1435b4b.jpg",
        description: "Strong visual impact with bold elements"
    }
];

export type CaptionStyle = {
    id: string;
    name: string;
    description: string;
    animation: "fade-up" | "slide-in" | "bounce" | "typewriter" | "zoom" | "wave";
    config: {
        fontFamily: string;
        fontSize: string;
        fontWeight: string;
        color: string;
        backgroundColor?: string;
        textShadow?: string;
        textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
        borderRadius?: string;
        padding?: string;
        letterSpacing?: string;
        lineHeight?: string;
        border?: string;
        backgroundImage?: string;
        WebkitTextStroke?: string;
        textAlign?: "left" | "center" | "right";
    };
};

export const CaptionStyles: CaptionStyle[] = [
    {
        id: "classic-bold",
        name: "Classic Bold",
        description: "Bold white text with shadow - perfect for any content",
        animation: "fade-up",
        config: {
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#ffffff",
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: "1.2",
            textAlign: "center"
        }
    },
    {
        id: "neon-glow",
        name: "Neon Glow",
        description: "Vibrant neon effect with glowing outline",
        animation: "zoom",
        config: {
            fontFamily: "var(--font-bebas-neue), 'Bebas Neue', sans-serif",
            fontSize: "3rem",
            fontWeight: "700",
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            lineHeight: "1.1",
            textAlign: "center"
        }
    },
    {
        id: "modern-box",
        name: "Modern Box",
        description: "Text in colored boxes with smooth animations",
        animation: "slide-in",
        config: {
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            fontSize: "2rem",
            fontWeight: "700",
            color: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            borderRadius: "12px",
            padding: "12px 24px",
            letterSpacing: "0.02em",
            lineHeight: "1.4",
            textAlign: "center"
        }
    },
    {
        id: "gradient-text",
        name: "Gradient Text",
        description: "Colorful gradient text with bold impact",
        animation: "bounce",
        config: {
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: "2.8rem",
            fontWeight: "900",
            color: "transparent",
            backgroundImage: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96e6a1)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: "1.2",
            textAlign: "center",
            WebkitTextStroke: "2px rgba(0, 0, 0, 0.3)"
        }
    },
    {
        id: "outlined",
        name: "Outlined",
        description: "Bold outlined text for maximum visibility",
        animation: "typewriter",
        config: {
            fontFamily: "'Arial Black', sans-serif",
            fontSize: "2.6rem",
            fontWeight: "900",
            color: "#ffffff",
            WebkitTextStroke: "3px #000000",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            lineHeight: "1.2",
            textAlign: "center"
        }
    },
    {
        id: "retro-wave",
        name: "Retro Wave",
        description: "80s retro aesthetic with vibrant colors",
        animation: "wave",
        config: {
            fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            fontSize: "2.4rem",
            fontWeight: "800",
            color: "#ff00ff",
            textShadow: "2px 2px 0px #00ffff, 4px 4px 0px #ffff00, 6px 6px 10px rgba(0, 0, 0, 0.5)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            lineHeight: "1.3",
            border: "3px solid #00ffff",
            padding: "8px 20px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            textAlign: "center"
        }
    }
];
