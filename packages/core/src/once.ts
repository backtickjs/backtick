import type { Client } from "./Client.js";
import {
  type ClientScript,
  isClientScript,
  type Param,
} from "./ClientScript.js";

/**
 * A script as one value for the bundle: its code runs once, at the top of the
 * bundle, and every read is that value, as a module-level `const` is in plain
 * TypeScript. For what every component shares, a context or a store, which an
 * expression would make again at each read. Each call of `once` is one value.
 *
 * Refused for a script that reads a variable of the script around it: at the
 * top of the bundle, nothing encloses it.
 */
export function once<T>(script: Client<T>): Client<T> {
  if (!isClientScript(script)) {
    throw new Error("`once` takes a script, cs`…`.");
  }
  const capture = script.module.params.find(isCapture);
  if (capture !== undefined) {
    throw new Error(
      `Can't make this script \`once\`: it reads \`${sourceName(capture.key)}\` ` +
        "from the script around it, and a `once` value is made at the top " +
        "of the bundle, outside every script.",
    );
  }
  const made: ClientScript = { ...script, once: true };
  return made as unknown as Client<T>;
}

function isCapture(param: Param): param is Extract<Param, { kind: "capture" }> {
  return param.kind === "capture";
}

// A binding key is `<name>$<fileHash>$<n>`.
function sourceName(key: string): string {
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
}
