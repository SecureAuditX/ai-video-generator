import { createAdminClient } from "@/lib/supabase/admin";

export async function uploadAudio(buffer: Buffer, fileName: string): Promise<string> {
    const supabase = createAdminClient();
    const bucket = "audio";

    // Attempt to upload
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, {
            contentType: "audio/mp3",
            upsert: true
        });

    if (error) {
        // If bucket doesn't exist error, we could try to create it here, but admin client might not have permissions to create buckets depending on RLS.
        // For now, just throw.
        throw new Error(`Failed to upload audio: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return publicUrl;
}
