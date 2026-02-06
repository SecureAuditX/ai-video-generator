import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function testStorage() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase credentials");
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Listing buckets...");
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error("Error listing buckets:", error);
        return;
    }

    console.log("Buckets:", buckets);

    const audioBucket = buckets.find(b => b.name === 'audio');
    if (!audioBucket) {
        console.log("Creating 'audio' bucket...");
        const { data, error: createError } = await supabase.storage.createBucket('audio', {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/mp3']
        });

        if (createError) {
            console.error("Error creating bucket:", createError);
        } else {
            console.log("Bucket 'audio' created");
        }
    } else {
        console.log("'audio' bucket already exists");
    }
}

testStorage();
