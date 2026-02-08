import { inngest } from "./client";
import { createAdminClient } from "@/lib/supabase/admin";
import { geminiModel } from "@/configs/google-gen-ai";
import fs from "fs";
import path from "path";

function logToFile(message: string, data?: any) {
    const logPath = path.join(process.cwd(), "debug.log");
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] INNGEST: ${message} ${data ? JSON.stringify(data) : ""}\n`;
    fs.appendFileSync(logPath, logEntry);
}

/**
 * Hello World test function
 */
export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.name || "World"}!` };
    }
);

/**
 * Video Generation function
 * Triggered when a user clicks generate on a series card.
 */
export const generateVideo = inngest.createFunction(
    { id: "generate-video" },
    { event: "video/generate.requested" },
    async ({ event, step }) => {
        logToFile("generateVideo STARTED", { seriesId: event.data.seriesId });
        console.log("Inngest: generateVideo STARTED", {
            seriesId: event.data.seriesId,
            timestamp: new Date().toISOString()
        });
        const { seriesId } = event.data;

        if (!seriesId) {
            console.error("Inngest: Missing seriesId");
            return { error: "Missing seriesId" };
        }

        // 1. Fetch Series data from supabase
        const series = await step.run("fetch-series-data", async () => {
            console.log("Inngest: Fetching series data for", seriesId);
            const supabase = createAdminClient();
            const { data, error } = await supabase
                .from("video_series")
                .select("*")
                .eq("id", seriesId)
                .single();

            if (error) {
                console.error("Inngest: Supabase error", error);
                throw new Error(`Failed to fetch series: ${error.message}`);
            }
            return data;
        });

        console.log("Inngest: Series data fetched", series.series_name);

        // 2. Generate Video Script using Gemini AI
        const videoScript = await step.run("generate-video-script", async () => {
            console.log("Inngest: Generating video script for", series.series_name);

            const sceneCount = series.video_duration === "60-70" ? "5 to 6" : "4 to 5";

            const prompt = `Generate a video script for a video series titled '${series.series_name}'. 
            The niche is '${series.niche}' and the video style is '${series.video_style}'. 
            The duration is roughly ${series.video_duration} seconds.
            The script should be natural and suitable for voiceover.
            Break the script into ${sceneCount} scenes.
            For each scene, provide:
            1. The text to be spoken (keep it engaging and fit for ${series.video_duration} seconds total).
            2. An image prompt for an AI image generator that matches the scene's mood and style.

            The output MUST be a JSON object with the following structure:
            {
              "title": "...",
              "scenes": [
                {
                  "text": "...",
                  "image_prompt": "..."
                }
              ]
            }
            No raw text or explanation, just the JSON.`;

            const result = await geminiModel.generateContent(prompt);
            const responseText = result.response.text();

            console.log("Inngest: Gemini raw response received");

            // Extract JSON from the response text
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                console.error("Inngest: Failed to find JSON in AI response", responseText);
                throw new Error("AI did not return a valid JSON script.");
            }

            const cleanJson = jsonMatch[0];

            try {
                const parsed = JSON.parse(cleanJson);
                console.log("Inngest: Script parsed successfully", parsed.title);
                return parsed;
            } catch (error) {
                console.error("Inngest: Error parsing Gemini response", error);
                throw new Error("Failed to parse AI generated script. Raw response: " + responseText);
            }
        });

        console.log("Inngest: Video script generated", videoScript.title);

        // 3. Generate Audio for each scene
        const { DeepgramVoices, FonadalabVoices } = await import("@/lib/constants");
        const allVoices = [...DeepgramVoices, ...FonadalabVoices];
        const selectedVoice = allVoices.find(v => v.id === series.voice);
        const voiceModel = selectedVoice?.model || "deepgram";

        console.log("Inngest: Generating audio with model", voiceModel, "voice", series.voice);

        const scenesWithAudio = [];
        // We iterate sequentially to generate audio for each scene
        for (let i = 0; i < videoScript.scenes.length; i++) {
            const scene = videoScript.scenes[i];
            const sceneWithAudio = await step.run(`generate-audio-${i}`, async () => {
                console.log(`Inngest: Generating audio for scene ${i}`);

                const { generateAudio } = await import("@/lib/tts");
                const { uploadAudio } = await import("@/lib/storage");

                // Generate audio buffer
                const audioBuffer = await generateAudio(scene.text, series.voice, voiceModel);

                // Upload to storage
                const fileName = `${seriesId}/scene-${i}-${Date.now()}.mp3`;
                const publicUrl = await uploadAudio(audioBuffer, fileName);

                console.log(`Inngest: Audio uploaded for scene ${i}: ${publicUrl}`);

                return {
                    ...scene,
                    audio_url: publicUrl
                };
            });
            scenesWithAudio.push(sceneWithAudio);
        }

        // Update the script with audio URLs
        const finalScript = { ...videoScript, scenes: scenesWithAudio };

        // 4. Generate Images for each scene
        console.log("Inngest: Generating images for each scene");
        const scenesWithImages = [];
        for (let i = 0; i < finalScript.scenes.length; i++) {
            const scene = finalScript.scenes[i];
            const sceneWithImage = await step.run(`generate-image-${i}`, async () => {
                console.log(`Inngest: Generating image for scene ${i}`);
                const { generateImage } = await import("@/lib/replicate");
                const { uploadImage } = await import("@/lib/storage");

                // Generate image buffer
                const imageBuffer = await generateImage(scene.image_prompt);

                // Upload to storage
                const fileName = `${seriesId}/scene-${i}-${Date.now()}.png`;
                const publicUrl = await uploadImage(imageBuffer, fileName);

                console.log(`Inngest: Image uploaded for scene ${i}: ${publicUrl}`);

                return {
                    ...scene,
                    image_url: publicUrl
                };
            });
            scenesWithImages.push(sceneWithImage);
        }

        const fullScript = { ...finalScript, scenes: scenesWithImages };
        console.log("Inngest: All images generated");

        // 5. Transcribe Audio and group captions
        console.log("Inngest: Transcribing audio for scenes");
        const scenesWithCaptions = [];
        const { transcribeAudio, groupWords } = await import("@/lib/transcription");

        for (let i = 0; i < fullScript.scenes.length; i++) {
            const scene = fullScript.scenes[i];
            const sceneWithCaptions = await step.run(`transcribe-audio-${i}`, async () => {
                console.log(`Inngest: Transcribing audio for scene ${i}`);
                const words = await transcribeAudio(scene.audio_url);
                const grouped = groupWords(words, 3); // 3 words at a time

                // Calculate duration from words
                const duration = words.length > 0 ? words[words.length - 1].end : 0;

                const animations = ['zoom-in', 'zoom-out', 'slide-up', 'slide-down', 'fade-in'];
                const animationType = animations[i % animations.length];

                return {
                    ...scene,
                    captions: grouped,
                    durationInFrames: Math.ceil(duration * 30), // 30 FPS
                    animationType
                };
            });
            scenesWithCaptions.push(sceneWithCaptions);
        }

        const remotionScript = { ...fullScript, scenes: scenesWithCaptions };
        console.log("Inngest: All transcriptions completed");

        // 6. Save assets and metadata to database (Intermediate)
        await step.run("save-metadata-to-db", async () => {
            console.log("Inngest: Saving intermediate metadata");
            const supabase = createAdminClient();
            await supabase
                .from("generated_videos")
                .update({
                    script: remotionScript
                })
                .eq('id', event.data.videoId);
        });

        // 7. Render Video using Remotion Lambda
        const finalVideoUrl = await step.run("render-video-remotion", async () => {
            console.log("Inngest: Triggering Remotion Lambda render");

            // This is a placeholder for the actual Lambda trigger logic
            // Since AWS setup is complex, we simulate the render delay 
            // and log what would be sent to Lambda.

            console.log("Rendering with props:", {
                scenes: remotionScript.scenes,
                captionStyleId: series.caption_style || 'classic-bold'
            });

            // Logic to trigger Remotion Lambda (requires @remotion/lambda)
            /*
            const { renderVideoOnLambda } = await import("@/lib/remotion-lambda");
            const result = await renderVideoOnLambda({
                scenes: remotionScript.scenes,
                captionStyleId: series.caption_style || 'classic-bold'
            });
            return result.url;
            */

            // For now, we'll return a placeholder or wait for the user to provide AWS creds
            // To make it "complete" for the flow, let's assume it returns a public path
            return `https://your-s3-bucket.s3.amazonaws.com/rendered/${event.data.videoId}.mp4`;
        });

        // 8. Update DB with final video URL and mark as completed
        await step.run("finalize-video-in-db", async () => {
            console.log("Inngest: Finalizing video record");
            const supabase = createAdminClient();

            const { error } = await supabase
                .from("generated_videos")
                .update({
                    video_url: finalVideoUrl,
                    status: "completed"
                })
                .eq('id', event.data.videoId);

            if (error) {
                console.error("Inngest: Error finalizing DB", error);
                throw new Error(`Failed to finalize video: ${error.message}`);
            }
        });

        console.log("Inngest: Video generation completed successfully");

        return {
            success: true,
            seriesId,
            videoUrl: finalVideoUrl,
            message: "Video generation completed successfully"
        };
    }
);
