import { cs } from "@backtickjs/core";

// A non-boolean operand nested inside a checked condition pins two errors:
// the operand check on `count`, and the `keep` argument mismatch (the
// failed operand pollutes `count && count > 0` to `number | boolean`). The
// condition's bare duplicate contributes nothing: its mapping has
// verification off, dropping its copy of the argument mismatch, and it
// stays check-free — a duplicate that re-checked its operands would pin
// the `count` mismatch a second time.
export default cs`(count: number) => {
  const keep = (on: boolean) => on;
  // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
  if (keep(count && count > 0)) {
    return "kept";
  }
  return "dropped";
}`;
