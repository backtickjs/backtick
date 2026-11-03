// Supabase, with the service role: only this function holds the key.
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  required("SUPABASE_URL"),
  required("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

// Supabase's error isn't an `Error`, so its message would be lost.
export function failed(error: { message: string }): Error {
  return new Error(`Supabase: ${error.message}`, { cause: error });
}

export function required(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Set ${name}: it's in Supabase's project settings.`);
  }
  return value;
}
