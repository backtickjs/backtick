// Apps and their versions, in Supabase, read and written with the service role.
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  required("SUPABASE_URL"),
  required("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

// The latest saved version, or nothing for an app never saved.
export async function latestVersion(
  id: string,
): Promise<{ version: number; source: string } | undefined> {
  const { data, error } = await supabase
    .from("versions")
    .select("version, source")
    .eq("app_id", id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    throw failed(error);
  }
  return data ?? undefined;
}

// Saves the app's next version, 1 for its first, and returns its number. The
// first save creates the app, and each one gives it `title`. Two saves at once
// for one app collide on the key, and the second fails.
export async function saveVersion(
  id: string,
  title: string,
  source: string,
): Promise<number> {
  const app = await supabase.from("apps").upsert({ id, title });
  if (app.error) {
    throw failed(app.error);
  }
  const latest = await latestVersion(id);
  const version = latest === undefined ? 1 : latest.version + 1;
  const { error } = await supabase
    .from("versions")
    .insert({ app_id: id, version, source });
  if (error) {
    throw failed(error);
  }
  return version;
}

// Supabase's error isn't an `Error`, so its message would be lost.
function failed(error: { message: string }): Error {
  return new Error(`Supabase: ${error.message}`, { cause: error });
}

function required(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Set ${name}: it's in Supabase's project settings.`);
  }
  return value;
}
