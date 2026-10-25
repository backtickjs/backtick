// Apps and their versions, in Supabase, read and written with the service role.
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  required("SUPABASE_URL"),
  required("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

// The latest saved version of the owner's app, or nothing for an app never
// saved, deleted, or someone else's.
export async function latestVersion(
  id: string,
  owner: string,
): Promise<{ version: number; source: string; title: string } | undefined> {
  const { data, error } = await supabase
    .from("apps")
    .select("title, versions(version, source)")
    .eq("id", id)
    .eq("owner_id", owner)
    .is("deleted_at", null)
    .order("version", { referencedTable: "versions", ascending: false })
    .limit(1, { referencedTable: "versions" })
    .maybeSingle();
  if (error) {
    throw failed(error);
  }
  const latest = data?.versions[0];
  return latest === undefined
    ? undefined
    : { version: latest.version, source: latest.source, title: data!.title };
}

// The owner's apps that aren't deleted, last saved first.
export async function listApps(
  owner: string,
): Promise<{ id: string; title: string; version: number; saved: string }[]> {
  const { data, error } = await supabase
    .from("apps")
    .select("id, title, versions(version, created_at)")
    .eq("owner_id", owner)
    .is("deleted_at", null)
    .order("version", { referencedTable: "versions", ascending: false })
    .limit(1, { referencedTable: "versions" });
  if (error) {
    throw failed(error);
  }
  return data
    .flatMap(({ id, title, versions: [latest] }) =>
      latest === undefined
        ? []
        : [{ id, title, version: latest.version, saved: latest.created_at }],
    )
    .sort((a, b) => b.saved.localeCompare(a.saved));
}

// Saves the owner's app's next version, 1 for its first, with its release and
// the packages it was built with, and returns its number, or why it can't: the
// app is someone else's, or its owner deleted it. The first save creates the
// app, and each one gives it `title`. Two saves at once for one app collide on
// the key, and the second fails. Older versions keep their source but lose
// their release.
export async function saveVersion(
  id: string,
  owner: string,
  title: string,
  source: string,
  compiled: string,
  packages: Record<string, string>,
): Promise<number | "not yours" | "deleted"> {
  const existing = await supabase
    .from("apps")
    .select("owner_id, deleted_at")
    .eq("id", id)
    .maybeSingle();
  if (existing.error) {
    throw failed(existing.error);
  }
  if (existing.data !== null && existing.data.owner_id !== owner) {
    return "not yours";
  }
  if (existing.data?.deleted_at) {
    return "deleted";
  }
  const app = await (existing.data === null
    ? supabase.from("apps").insert({ id, owner_id: owner, title })
    : supabase.from("apps").update({ title }).eq("id", id));
  if (app.error) {
    throw failed(app.error);
  }
  const latest = await latestVersion(id, owner);
  const version = latest === undefined ? 1 : latest.version + 1;
  const { error } = await supabase
    .from("versions")
    .insert({ app_id: id, version, source, compiled, packages });
  if (error) {
    throw failed(error);
  }
  // After the insert, so the app always has a release to open.
  const cleared = await supabase
    .from("versions")
    .update({ compiled: null })
    .eq("app_id", id)
    .lt("version", version)
    .not("compiled", "is", null);
  if (cleared.error) {
    throw failed(cleared.error);
  }
  return version;
}

// What one `save_app` check found: the version it became if it passed, or the
// source it checked if it failed.
export type Check = {
  appId: string;
  owner: string;
  errors: string[];
  warnings: string[];
  durationMs: number;
} & ({ version: number; source?: never } | { source: string; version?: never });

export async function recordCheck(check: Check): Promise<void> {
  const { error } = await supabase.from("checks").insert({
    app_id: check.appId,
    owner_id: check.owner,
    version: check.version ?? null,
    source: check.source ?? null,
    errors: check.errors,
    warnings: check.warnings,
    duration_ms: check.durationMs,
  });
  if (error) {
    throw failed(error);
  }
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
