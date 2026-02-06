import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(prompt: string): Promise<Buffer> {
    console.log(`Generating image for prompt: ${prompt}`);

    const output: any = await replicate.run(
        "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
        {
            input: {
                prompt: prompt,
                width: 1024,
                height: 1024,
                num_outputs: 1,
                scheduler: "K_EULER",
                guidance_scale: 0,
            }
        }
    );

    // Replicate returns an array of readable streams/urls for this model
    // We fetch the first one and return as Buffer
    const imageUrl = output[0];
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}
