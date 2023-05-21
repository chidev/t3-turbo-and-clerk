import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://binbzkbeoargsmcwwbzk.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbmJ6a2Jlb2FyZ3NtY3d3YnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzkyMTUsImV4cCI6MTk5OTYxNTIxNX0.lNKCcuIzcGUTDtvhCKCR_giXCi7nMWsxVwMiISr8gtY";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
