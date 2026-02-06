import { DeepgramVoices, FonadalabVoices } from "./constants";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const FONADALAB_API_KEY = process.env.FONADALAB_API_KEY;

export async function generateAudio(text: string, voiceId: string, model: string): Promise<Buffer> {
    if (model === "deepgram") {
        return generateDeepgramAudio(text, voiceId);
    } else if (model === "fonadalab") {
        return generateFonadalabAudio(text, voiceId);
    } else {
        throw new Error(`Unsupported TTS model: ${model}`);
    }
}

async function generateDeepgramAudio(text: string, voiceId: string): Promise<Buffer> {
    if (!DEEPGRAM_API_KEY) {
        throw new Error("DEEPGRAM_API_KEY is not set");
    }

    const url = `https://api.deepgram.com/v1/speak?model=${voiceId}`;

    console.log(`Generating Deepgram audio for voice: ${voiceId}`);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${DEEPGRAM_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Deepgram TTS failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

async function generateFonadalabAudio(text: string, voiceId: string): Promise<Buffer> {
    if (!FONADALAB_API_KEY) {
        throw new Error("FONADALAB_API_KEY is not set");
    }

    // Checking if voiceId needs mapping or is correct as is. 
    // Assuming voiceId from constants (e.g., 'vanee') is what the API expects.

    const url = "https://api.fonadalabs.ai/v1/tts/synthesize";

    console.log(`Generating Fonadalab audio for voice: ${voiceId}`);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${FONADALAB_API_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json" // Usually expects JSON or Audio bytes? 
            // The search result said Accept: application/json. 
            // But if it returns audio, it might return a URL or base64.
            // Let's assume it returns audio data directly or a JSON with audio content.
            // If the search result says "Example ... format", maybe we need to specify format.
        },
        body: JSON.stringify({
            text,
            voice: voiceId,
            format: "mp3", // Assuming 'mp3' is supported
            speed: 1
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fonadalab TTS failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Need to handle response type.
    // If it returns JSON with audio_url or audio_base64:
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.audio_base64) {
            return Buffer.from(data.audio_base64, 'base64');
        } else if (data.audio_url) {
            // Fetch the URL
            const audioRes = await fetch(data.audio_url);
            const ab = await audioRes.arrayBuffer();
            return Buffer.from(ab);
        } else if (data.audio) {
            // some apis return 'audio' field
            return Buffer.from(data.audio, 'base64');
        }
    }

    // If it returns raw audio
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}
