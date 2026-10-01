import type { Client } from "./Client.js";

/**
 * An export of a module the client provides, held as a value: what a script
 * splices to use it, and what a bundle imports it by.
 */
export interface ClientImport<T> extends Client<T> {
  readonly "@backtickjs": "ClientImport";
  readonly name: string;
  // the specifier the client resolves
  readonly from: string;
  // the versions of `from`'s package it works with, a semver range
  readonly version: string;
}

export function isClientImport(value: unknown): value is ClientImport<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientImport"
  );
}

// `T` is what the module's own declarations say the export is; nothing here
// can check the two agree, and the module the client resolves is what does.
export function createImport<T>({
  name,
  from,
  version,
}: {
  name: string;
  from: string;
  version: string;
}): ClientImport<T> {
  return {
    "@backtickjs": "ClientImport",
    name,
    from,
    version,
  } as unknown as ClientImport<T>;
}
