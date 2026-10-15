import type { Bundle } from "./Bundle.js";
import type { Client } from "./Client.js";

/**
 * Executes a bundle on the client, as the bundle reading it was run, with the
 * same modules, and resolves to its value: what a script fetched at runtime
 * from the server, which the bundler couldn't see. As CommonJS, a function of
 * `require`, handed the bundle's own; as an ES module, imported from a `data:`
 * URL, which the page's import map answers.
 */
export interface ClientExec extends Client<
  <T>(bundle: Bundle<T>) => Promise<Awaited<T>>
> {
  readonly "@backtickjs": "ClientExec";
}

export const exec: Client<<T>(bundle: Bundle<T>) => Promise<Awaited<T>>> = {
  "@backtickjs": "ClientExec",
} as unknown as ClientExec;

export function isClientExec(value: unknown): value is ClientExec {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientExec"
  );
}
