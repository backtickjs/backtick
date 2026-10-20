// Apps and their versions, in Supabase, read and written with the service role.
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  required("SUPABASE_URL"),
  required("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

export async function createApp(title: string): Promise<string> {
  const { data, error } = await supabase
    .from("apps")
    .insert({ title })
    .select("id")
    .single();
  if (error) {
    throw failed(error);
  }
  return data.id;
}

// The latest version, `{ version: 0 }` for an app with none, or nothing for no
// such app.
export async function latestVersion(
  id: string,
): Promise<{ version: number; source?: string } | undefined> {
  const { data: app, error } = await supabase
    .from("apps")
    .select("versions(version, source)")
    .eq("id", id)
    .order("version", { referencedTable: "versions", ascending: false })
    .limit(1, { referencedTable: "versions" })
    .maybeSingle();
  if (error) {
    throw failed(error);
  }
  if (app === null) {
    return undefined;
  }
  return app.versions[0] ?? { version: 0 };
}

// Saves the next version and returns its number. Two saves at once for one
// app collide on the key, and the second fails.
export async function saveVersion(
  id: string,
  after: number,
  source: string,
): Promise<number> {
  const version = after + 1;
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
