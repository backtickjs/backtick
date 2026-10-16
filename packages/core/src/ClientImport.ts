import type { Client } from "./Client.js";

/**
 * An export of a module the client provides, held as a value: what a script
 * splices to use it, and what a bundle imports it by. The compiler writes one
 * per name of `import { View } from "react-native" with { backtick: "client" }`.
 */
export interface ClientImport<T> extends Client<T> {
  readonly "@backtickjs": "ClientImport";
  // the export, or `*` for the module's namespace
  readonly name: string;
  // the specifier the client resolves
  readonly from: string;
  // the exact version of `from`'s package it's typed against
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
}): Client<T> {
  return {
    "@backtickjs": "ClientImport",
    name,
    from,
    version,
  } as unknown as ClientImport<T>;
}
