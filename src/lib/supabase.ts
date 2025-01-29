import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prkkzmdpendplfxqzzep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBya2t6bWRwZW5kcGxmeHF6emVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzEwNTQ3NywiZXhwIjoyMDUyNjgxNDc3fQ.dehYJ5d-C0YTElTMQCHpxxRJ9R05nplxJzLzuimAmMg';

export const supabase = createClient(supabaseUrl, supabaseKey);