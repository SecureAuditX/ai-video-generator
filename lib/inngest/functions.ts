import { inngest } from "./client";
import { createAdminClient } from "@/lib/supabase/admin";

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
        console.log("Inngest: generateVideo started", event.data);
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

        // 2. Placeholder steps
        await step.run("generate-video-script", async () => {
            return { text: "Script placeholder" };
        });

        return {
            success: true,
            seriesId,
            message: "Test run successful"
        };
    }
);
