import { version } from "./version.js";

type Parts = [major: number, minor: number, patch: number];

function parse(value: string): Parts | undefined {
  const parts = value.split("-")[0].split(".").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return undefined;
  }
  return parts as Parts;
}

const runtime = version.split(".").map(Number) as Parts;

function isNewer(a: Parts, b: Parts): boolean {
  for (let index = 0; index < a.length; index++) {
    if (a[index] !== b[index]) {
      return a[index] > b[index];
    }
  }
  return false;
}

/**
 * Throws when a script was compiled by a toolchain newer than this runtime, or
 * by one whose version this runtime cannot read.
 *
 * The compatibility check is one-sided: a newer compiler can emit metadata this
 * runtime has no case for, while a script from an older one only ever uses a
 * subset of what this runtime already handles.
 */
export function assertVersion(compiledWith: string): void {
  if (compiledWith === version) {
    return;
  }

  const compiled = parse(compiledWith);
  if (!compiled) {
    throw new Error(
      `Could not parse "${compiledWith}". ` +
        'Expected three numeric parts like "1.2.3".',
    );
  }

  if (!isNewer(compiled, runtime)) {
    return;
  }

  throw new Error(
    `This script was compiled by backtick ${compiledWith}, but is running ` +
      `on ${version}. Upgrade @backtickjs/core to ${compiledWith} or newer.`,
  );
}
