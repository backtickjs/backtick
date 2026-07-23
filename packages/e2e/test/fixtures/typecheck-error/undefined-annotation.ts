import { cs } from "@backtickjs/core";

// A host alias smuggles `undefined` past the syntactic keyword ban; the
// value-position checks reject the parameter at its first use — `cs.const`
// constrains initializers and assignment right-hand sides to `ClientValue`.
type Maybe = string | undefined;

const stored = cs`(x: Maybe) => {
  const y = x;
  return 1;
}`;

const written = cs`(x: Maybe) => {
  let y = "";
  y = x;
  return 1;
}`;