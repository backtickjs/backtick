import semver from "semver";
import type { Modules } from "./modules.js";

/**
 * What the bundler throws when it refuses its input, such as a value it can't
 * splice. An error a server component throws passes through unchanged.
 *
 * `getResponse()` turns it into a JSON response at its `status` (400). Hono's
 * default error handler calls it for you.
 */
export class BundlerError extends Error {
  override name: string = "BundlerError";
  readonly status: 400 | 406 = 400;

  getResponse(): Response {
    return Response.json(
      { name: this.name, message: this.message },
      { status: this.status },
    );
  }
}

/**
 * A script's import the client can't run: `imported` from the module `from`,
 * typed against `version`, where the client provides the module at
 * `provided`, a version the import isn't typed for (an earlier one, or
 * another major), or doesn't provide it at all. The client can't change, so
 * the server draws it something else: it catches this to answer differently,
 * or branches with `supports` before drawing. Answered as a 406.
 */
export class UnsupportedImportError extends BundlerError {
  override name = "UnsupportedImportError";
  // Not Acceptable: no bundle the app can run, so it has to update.
  override readonly status = 406;

  constructor(
    readonly from: string,
    readonly imported: string,
    readonly version: string,
    modules: Modules,
  ) {
    super(unsupported(from, imported, version, modules));
    this.provided = modules[from];
  }

  // the version the client provides, or none
  readonly provided: string | undefined;
}

// What an unsupported import's message says: the cause, what the app has,
// then the fix, which depends on the builds in use, which only the developer
// knows, so each way is said.
function unsupported(
  from: string,
  imported: string,
  version: string,
  modules: Modules,
): string {
  const provided = modules[from];
  const lines = [`Can't import \`${imported}\` from "${from}": `];
  const fallback = `check \`supports("${from}", "^${version}")\` and render a fallback`;
  if (provided === undefined) {
    const listed = Object.entries(modules).map(
      ([specifier, at]) => `${specifier}@${at}`,
    );
    if (listed.length === 0) {
      lines[0] += "the request lists no modules.";
      lines.push("The app probably didn't send the x-backtick-modules header.");
    } else {
      lines[0] += `this app doesn't have "${from}".`;
      lines.push(
        `It has ${listed.join(", ")}.`,
        `Add "${from}" to the app's module map for future builds. For builds already out, ${fallback}.`,
      );
    }
  } else if (semver.major(provided) > semver.major(version)) {
    const installed = packageOf(from);
    lines[0] += "this app has a newer major.";
    lines.push(
      `The server is typed against ${from}@${version}; this app has ${provided}.`,
      `If every build in use has ${installed}@^${semver.major(provided)}, upgrade ${installed} on the server. Otherwise, ${fallback}.`,
    );
  } else {
    lines[0] += "this app has an older version.";
    lines.push(
      `The server is typed against ${from}@${version}; this app has ${provided}.`,
      `Check \`supports("${from}", "^${version}")\` and render a fallback. Don't downgrade the server: newer builds would break.`,
    );
  }
  return lines.join("\n");
}

// The package a module specifier is in: `solid-js` for `solid-js/web`.
function packageOf(specifier: string): string {
  const segments = specifier.split("/");
  return segments.slice(0, specifier.startsWith("@") ? 2 : 1).join("/");
}
