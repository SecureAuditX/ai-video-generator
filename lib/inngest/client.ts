import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "ai-video-generator",
    // Explicitly set log level for better debugging
});

console.log("Inngest: Client initialized with ID: ai-video-generator");
