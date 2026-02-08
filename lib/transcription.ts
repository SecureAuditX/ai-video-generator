import { createClient } from "@deepgram/sdk";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

export async function transcribeAudio(audioUrl: string) {
    if (!DEEPGRAM_API_KEY) {
        throw new Error("DEEPGRAM_API_KEY is not set");
    }

    const deepgram = createClient(DEEPGRAM_API_KEY);

    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        { url: audioUrl },
        {
            model: "nova-2",
            smart_format: true,
            utterances: true,
        }
    );

    if (error) {
        console.error("Deepgram Error:", error);
        throw error;
    }

    return result.results.channels[0].alternatives[0].words;
}

export function groupWords(words: any[], wordsPerChunk: number = 2) {
    const chunks = [];
    for (let i = 0; i < words.length; i += wordsPerChunk) {
        const chunk = words.slice(i, i + wordsPerChunk);
        chunks.push({
            text: chunk.map((w: any) => w.word).join(" "),
            start: chunk[0].start,
            end: chunk[chunk.length - 1].end
        });
    }
    return chunks;
}
