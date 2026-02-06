import dotenv from "dotenv";
import path from "path";

// Manually load env from .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function testTTSKeys() {
    const deepgramKey = process.env.DEEPGRAM_API_KEY;
    const fonadalabKey = process.env.FONADALAB_API_KEY;

    console.log("Checking keys...");
    if (deepgramKey) {
        console.log("DEEPGRAM_API_KEY: Found (Starts with " + deepgramKey.substring(0, 5) + ")");
    } else {
        console.log("DEEPGRAM_API_KEY: Missing");
    }

    if (fonadalabKey) {
        console.log("FONADALAB_API_KEY: Found (Starts with " + fonadalabKey.substring(0, 5) + ")");
    } else {
        console.log("FONADALAB_API_KEY: Missing");
    }
}

testTTSKeys();
