// Test262 cases that don't apply to client script, and why. A key is a path
// under `test262/test/`: one case, or a directory and every case under it.
//
// A skipped case isn't generated, so no client is asked to run it. An entry
// that matches no case stops the build: moving to a newer Test262 can rename
// what an entry named.
export const skips: Record<string, string> = {
  "language/global-code/return.js":
    "a client script has no global code: its top level is a function body, where `return` is legal",
  "language/statements/return/S12.9_A1_T4.js":
    "a client script has no global code: its top level is a function body, where `return` is legal",
};
