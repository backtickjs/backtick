import { cs } from "@backtickjs/core";

// A splice is read when the `cs` line runs, so reading a `const` declared
// after it is reported as TypeScript reports it for plain code. Outside a
// function of the script, TypeScript says so; in one, the compiler does (see
// `compile-errors/splice-before-declaration`). Each is in a function never
// called, so nothing reads one at runtime.

export function inExpression() {
  // @ts-expect-error: Block-scoped variable 'size' used before its declaration.
  const doubled = cs`$size * 2`;
  const size = 4;
  return doubled;
}

export function inBlock() {
  const read = cs`{
    // @ts-expect-error: Block-scoped variable 'label' used before its declaration.
    return $label;
  }`;
  const label = "ready";
  return read;
}
