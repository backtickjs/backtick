// Test262 cases that don't apply to client script, and why.
//
// A skipped case isn't generated, so no client is asked to run it. An entry
// that matches no case stops the build: moving to a newer Test262 can rename
// what an entry named, and a change to the language can retire one.

// By path under `test262/test/`: one case, or a directory and every case
// under it.
export const skips: Record<string, string> = {
  "language/global-code/return.js":
    "a client script has no global code: its top level is a function body, where `return` is legal",
  "language/statements/return/S12.9_A1_T4.js":
    "a client script has no global code: its top level is a function body, where `return` is legal",
};

// By what the compiler or the type checker refuses: a construct client script
// leaves out on purpose. A case refused for one can never run, whatever else it
// holds, so it is skipped rather than reported.
export const skippedRefusals: Record<
  string,
  { refusal: RegExp; reason: string }
> = {
  "X.prototype": {
    refusal: /^Property 'prototype' does not exist on type '\w+Constructor'/,
    reason:
      "client script has no prototypes: a built-in's members are reached off its values, never through its constructor",
  },
};
