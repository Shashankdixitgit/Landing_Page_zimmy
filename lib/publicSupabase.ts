// Public (anon) access to the zimmy Supabase project. Row-level security only allows
// inserting creator applications and uploading into creator-analytics/applications/;
// this key cannot read anything back.
export const SUPABASE_URL = "https://ngtsykzhkhfrbttakexd.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ndHN5a3poa2hmcmJ0dGFrZXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNzc3MjcsImV4cCI6MjEwNjg1MzcyN30.hrGYNZyXtf7_pFmGPs0-bIfUZEiRxUmreJtECyK64-U";

const headers = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` };

export async function uploadScreenshot(folder: string, file: File, i: number): Promise<string> {
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-60);
  const path = `applications/${folder}/${i + 1}-${safe}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/creator-analytics/${path}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": file.type || "image/png", "x-upsert": "false" },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  return path;
}

export async function submitApplication(row: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/creator_applications`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Submit failed (${res.status})`);
}
