import type { Client } from "./Client.js";
import type { Runtime } from "./createRuntime.js";

/**
 * In a script, `$runtime`: the runtime that ran the bundle, to fetch and run
 * other bundles as the app does. A bundle that uses it throws as it starts if
 * what runs it provides none, as a page's own few lines don't.
 */
export interface ClientRuntime extends Client<Runtime> {
  readonly "@backtickjs": "ClientRuntime";
}

export const runtime: Client<Runtime> = {
  "@backtickjs": "ClientRuntime",
} as unknown as ClientRuntime;

export function isClientRuntime(value: unknown): value is ClientRuntime {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientRuntime"
  );
}
