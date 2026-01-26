import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rjggsbnnzpteaqzfvdyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZ2dzYm5uenB0ZWFxemZ2ZHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDg2NDUsImV4cCI6MjA4NTAyNDY0NX0.JVCt2Tj7KsXyv0r7tteVH6l9hlMVz0lOFMM0fD8qSUA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySchema() {
    console.log("Verifying schema...");
    const tables = ['profiles', 'students', 'messages', 'orientations', 'posts', 'contact_messages'];
    let allExist = true;

    for (const table of tables) {
        const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
        if (error) {
            console.error(`MISSING or INACCESSIBLE: ${table} (${error.message})`);
            allExist = false;
        } else {
            console.log(`OK: ${table}`);
        }
    }

    if (allExist) {
        console.log("SCHEMA_VERIFIED");
        process.exit(0);
    } else {
        console.error("SCHEMA_INCOMPLETE");
        process.exit(1);
    }
}

verifySchema();
