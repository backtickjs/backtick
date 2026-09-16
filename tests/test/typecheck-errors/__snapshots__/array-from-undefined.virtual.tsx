import { cs } from "@backtickjs/core";

// A mapper that answers with nothing, and an array that never leaves the
// script. What catches it is the bound on `Array.from`'s type parameter:
// `T extends ClientValue`, which `undefined` is not.
//
// Without the bound this is still an error — nothing reads a member off a
// `void[]` — but three of them, thirty columns away, one dumping the whole
// union of client types. Here it is one, on the mapper that is wrong.
// @ts-expect-error: Argument of type '() => void' is not assignable to parameter of type '(v: ClientValue, k: number) => ClientValue'.
export const counted = cs.lift(cs.const(cs.receiver(cs.receiver(Array).from({ length: 3 }, () => {
})).length));
