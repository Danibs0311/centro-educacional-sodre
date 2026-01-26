import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rjggsbnnzpteaqzfvdyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZ2dzYm5uenB0ZWFxemZ2ZHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDg2NDUsImV4cCI6MjA4NTAyNDY0NX0.JVCt2Tj7KsXyv0r7tteVH6l9hlMVz0lOFMM0fD8qSUA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Testing connection...");
    try {
        const { data, error } = await supabase.from('posts').select('count', { count: 'exact', head: true });

        if (error) {
            if (error.code === '42P01') {
                console.error("FAIL: Connection successful, but 'posts' table not found. SQL script NOT run?");
            } else {
                console.error("FAIL: Connection error:", error.message);
            }
            process.exit(1);
        } else {
            console.log("SUCCESS: Database connected and 'posts' table exists.");
            process.exit(0);
        }
    } catch (err) {
        console.error("FAIL: Network/Client error", err);
        process.exit(1);
    }
}

testConnection();
