import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // Using gemini-2.0-flash for speed and reliability
});
