// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vhexgzptfskdmzxzroij.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZXhnenB0ZnNrZG16eHpyb2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjczMDAsImV4cCI6MjA2NTIwMzMwMH0.4trx7qUoDYzpMtHvSA7p2JUrFU7DYB5fuwO7zFqpUTQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);