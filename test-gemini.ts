import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

// Manually load env from .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found");
        return;
    }

    console.log("Using API Key:", apiKey.substring(0, 5) + "...");

    // Explicitly test connectivity
    try {
        console.log("Testing fetch to google.com...");
        const res = await fetch("https://www.google.com");
        console.log("Google Reachable:", res.status);
    } catch (e) {
        console.error("Google Unreachable:", e);
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Try stable model first
        console.log("Testing with gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, world!");
        console.log("Response 1.5:", result.response.text());

        // Try the one used in app
        console.log("Testing with gemini-2.0-flash...");
        const model2 = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result2 = await model2.generateContent("Hello, world!");
        console.log("Response 2.0:", result2.response.text());

    } catch (error) {
        console.error("Gemini Error:", error);
    }
}

testGemini();
