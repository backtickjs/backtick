// Who's asking, and the account's data. The phone's access token must be one
// auth.backtickjs.com issued for this origin (signed with the key it
// publishes, not expired: RFC 9068, section 4); the home then reads and
// changes the user's apps with its own key, always filtered by that user.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { assistantIds, assistantNamed } from "./components/assistants.js";
import type { Assistant } from "./components/assistants.js";

let keys: ReturnType<typeof createRemoteJWKSet> | undefined;

export async function userOf(
  authorization: string | undefined,
): Promise<string | undefined> {
  const token = /^Bearer (\S+)$/.exec(authorization ?? "")?.[1];
  if (token === undefined) {
    return undefined;
  }
  const issuer = required("BACKTICK_AUTH_ORIGIN");
  keys ??= createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));
  try {
    const { payload } = await jwtVerify(token, keys, {
      issuer,
      audience: required("BACKTICK_HOME_ORIGIN"),
      typ: "at+jwt",
      algorithms: ["ES256"],
    });
    return typeof payload.sub === "string" ? payload.sub : undefined;
  } catch {
    return undefined;
  }
}

let client: SupabaseClient | undefined;

export function supabase(): SupabaseClient {
  client ??= createClient(
    required("SUPABASE_URL"),
    required("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
  return client;
}

// Deletes the user's account and everything Backtick keeps for it, now: the
// previews in the user's folder, which storage keeps apart from the database,
// then the user, whose apps (and their versions), checks, devices, sessions
// and assistants' consents go with it (`on delete cascade`).
export async function deleteAccount(user: string): Promise<void> {
  const previews = supabase().storage.from("previews");
  for (;;) {
    const { data, error } = await previews.list(user, { limit: 1000 });
    if (error) {
      throw failed(error);
    }
    if (data.length === 0) {
      break;
    }
    const removed = await previews.remove(
      data.map((file) => `${user}/${file.name}`),
    );
    if (removed.error) {
      throw failed(removed.error);
    }
  }
  const { error } = await supabase().auth.admin.deleteUser(user);
  if (error) {
    throw failed(error);
  }
}

// Erases the apps their owners deleted more than 30 days ago: their previews,
// which storage keeps apart from the database and only its API deletes, then
// the apps, whose versions go with them (`on delete cascade`). Previews
// first, so an app whose preview couldn't go stays, for the next run. Daily,
// from app.backtickjs.com's cron; a run takes up to 1,000, the next the rest.
export async function eraseDeletedApps(): Promise<number> {
  const expired = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const { data, error } = await supabase()
    .from("apps")
    .select("id, owner_id")
    .lt("deleted_at", expired.toISOString())
    .limit(1000);
  if (error) {
    throw failed(error);
  }
  if (data.length === 0) {
    return 0;
  }
  const removed = await supabase()
    .storage.from("previews")
    .remove(data.map((app) => `${app.owner_id}/${app.id}.jpg`));
  if (removed.error) {
    throw failed(removed.error);
  }
  // Only through `erase_apps`, which erases nothing deleted under 30 days ago.
  const erased = await supabase().rpc("erase_apps", {
    ids: data.map((app) => app.id),
  });
  if (erased.error) {
    throw failed(erased.error);
  }
  return erased.data as number;
}

// The assistants the user connected (supabase/migrations, assistants_of()),
// the latest first, each by the name it registered with: only those Backtick
// knows (components/assistants.ts).
export async function assistantsOf(
  user: string,
): Promise<{ assistant: Assistant; name: string }[]> {
  const { data, error } = await supabase().rpc("assistants_of", {
    owner: user,
  });
  if (error) {
    throw failed(error);
  }
  return (data as { name: string; connected_at: string }[])
    .toSorted((a, b) => b.connected_at.localeCompare(a.connected_at))
    .flatMap(({ name }) => {
      const assistant = assistantNamed(name);
      return assistant === undefined ? [] : [{ assistant, name }];
    });
}

// The user's assistants: those connected, in Backtick's order, and the one
// New and Edit open, the one they chose (supabase/migrations, settings) while
// it's connected, or else the latest connected. None until one is.
export async function connectionsOf(
  user: string,
): Promise<{ connected: Assistant[]; assistant: Assistant | null }> {
  const latest = (await assistantsOf(user)).map(({ assistant }) => assistant);
  const { data, error } = await supabase()
    .from("settings")
    .select("assistant")
    .eq("user_id", user)
    .maybeSingle();
  if (error) {
    throw failed(error);
  }
  const chosen = latest.find((id) => id === data?.assistant);
  return {
    connected: assistantIds.filter((id) => latest.includes(id)),
    assistant: chosen ?? latest[0] ?? null,
  };
}

// Choosing the assistant New and Edit open, one of those connected.
export async function chooseAssistant(
  user: string,
  assistant: Assistant,
): Promise<void> {
  const { error } = await supabase().from("settings").upsert({
    user_id: user,
    assistant,
    updated_at: new Date().toISOString(),
  });
  if (error) {
    throw failed(error);
  }
}

// Disconnecting an assistant: each name it registered with
// (supabase/migrations, disconnect_assistant()), and no longer the user's
// choice, so reconnecting it later doesn't choose it again.
export async function disconnectAssistant(
  user: string,
  assistant: Assistant,
): Promise<void> {
  const names = (await assistantsOf(user))
    .filter((connected) => connected.assistant === assistant)
    .map(({ name }) => name);
  for (const name of names) {
    const { error } = await supabase().rpc("disconnect_assistant", {
      owner: user,
      assistant: name,
    });
    if (error) {
      throw failed(error);
    }
  }
  const { error } = await supabase()
    .from("settings")
    .update({ assistant: null, updated_at: new Date().toISOString() })
    .eq("user_id", user)
    .eq("assistant", assistant);
  if (error) {
    throw failed(error);
  }
}

// Supabase's error isn't an `Error`, so its message would be lost.
export function failed(error: { message: string }): Error {
  return new Error(`Supabase: ${error.message}`, { cause: error });
}

function required(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Set ${name}.`);
  }
  return value;
}
