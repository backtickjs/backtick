import { version } from "./version.js";

// one warning per offending version, not per script: a single stale install
// would otherwise report on every `cs` template in the program
const warned = new Set<string>();

type Parts = [major: number, minor: number, patch: number];

function parse(value: string): Parts | undefined {
  const parts = value.split("-")[0].split(".").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return undefined;
  return parts as Parts;
}

function isNewer(a: Parts, b: Parts): boolean {
  for (let index = 0; index < a.length; index++) {
    if (a[index] !== b[index]) return a[index] > b[index];
  }
  return false;
}

/**
 * Warns when a script was compiled by a toolchain newer than this runtime.
 *
 * The check is deliberately one-sided: a newer compiler can emit metadata this
 * runtime has no case for, while a script from an older one only ever uses a
 * subset of what this runtime already handles. It warns rather than throws —
 * the pairing is usually still workable, and hard-failing on a skew the package
 * manager allowed would strand people with no way forward.
 */
export function checkVersion(compiledWith: string): void {
  if (compiledWith === version || warned.has(compiledWith)) return;

  const compiled = parse(compiledWith);
  const runtime = parse(version);
  // an unparseable version is not evidence of a mismatch
  if (!compiled || !runtime || !isNewer(compiled, runtime)) return;

  warned.add(compiledWith);
  console.warn(
    `[backtick] This script was compiled by backtick ${compiledWith}, but is ` +
      `running on ${version}. Upgrade @backtickjs/core to ${compiledWith} or newer.`,
  );
}
