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
        throw new Error(`Failed to upload audio: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return publicUrl;
}

export async function uploadImage(buffer: Buffer, fileName: string): Promise<string> {
    const supabase = createAdminClient();
    const bucket = "images";

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, {
            contentType: "image/png",
            upsert: true
        });

    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return publicUrl;
}
