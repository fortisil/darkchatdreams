import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prkkzmdpendplfxqzzep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBya2t6bWRwZW5kcGxmeHF6emVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDU0NzcsImV4cCI6MjA1MjY4MTQ3N30.sGj-ZI2QxXHPXHj_nNQRXYgWi0Xjj-UXRQiqQYJDjOA';

export const supabase = createClient(supabaseUrl, supabaseKey);