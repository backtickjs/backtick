import type { Modules } from "./modules.js";

/**
 * What the bundler throws when it refuses its input: a value it can't
 * splice, a tag it can't draw, an import the client can't run. An error a
 * server component throws while the bundler runs it passes through as it is.
 */
export class BundlerError extends Error {
  constructor(message: string) {
    super(message);
    // as the class it is, in logs: `ClientVersionMismatch: Can't import …`
    this.name = new.target.name;
  }
}

/**
 * A script's import the client can't run: `imported` from the module `from`,
 * typed against `version`, where the client provides the module at
 * `provided`, a version the import isn't typed for (an earlier one, or
 * another major), or doesn't provide it at all. The client can't change, so
 * the server draws it something else: it catches this to answer differently,
 * or branches with `supports` before drawing.
 */
export class ClientVersionMismatch extends BundlerError {
  constructor(
    readonly from: string,
    readonly imported: string,
    readonly version: string,
    modules: Modules,
  ) {
    const provided = modules[from];
    const listed = Object.entries(modules)
      .map(([specifier, at]) => `${specifier}@${at}`)
      .join(", ");
    const problem =
      provided === undefined
        ? `the client provides ${listed || "no modules"}`
        : `it's typed against ${version}, and the client provides ${from}@${provided}`;
    const fix = `supports("${from}", "^${version}")`;
    super(
      `Can't import \`${imported}\` from "${from}": ${problem}. ` +
        `Check \`${fix}\` first.`,
    );
    this.provided = provided;
  }

  // the version the client provides, or none
  readonly provided: string | undefined;
}
