// The one place the toolchain's version is written down: the compiler stamps
// this into every script's metadata and `checkVersion` compares against it, so
// both sides are guaranteed to mean the same number. Checked in rather than
// read from a manifest, which would put a JSON import on the runtime path of
// every consumer's bundler; `pnpm check:versions` fails if it drifts.
export const version = "0.1.0";
