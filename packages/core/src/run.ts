import type { Bundle } from "./Bundle.js";
import type { Client } from "./Client.js";

/**
 * Runs a bundle on the client, as the bundle reading it was run, with the
 * same modules, and resolves to its value: what a script fetched at runtime
 * from the server, which the bundler couldn't see. As CommonJS, a function of
 * `require`, handed the bundle's own; as an ES module, imported from a `data:`
 * URL, which the page's import map answers.
 */
export interface ClientRun extends Client<
  <T>(bundle: Bundle<T>) => Promise<T>
> {
  readonly "@backtickjs": "ClientRun";
}

export const run: Client<<T>(bundle: Bundle<T>) => Promise<T>> = {
  "@backtickjs": "ClientRun",
} as unknown as ClientRun;

export function isClientRun(value: unknown): value is ClientRun {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientRun"
  );
}
