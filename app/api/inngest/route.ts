import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { helloWorld, generateVideo } from "@/lib/inngest/functions";

export const dynamic = "force-dynamic";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld,
        generateVideo
    ],
});
