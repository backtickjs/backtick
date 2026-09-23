import type { Client } from "./Client.js";
import type { ClientValue } from "./declarations.generated.js";

/**
 * A name the client answers for, held as a value.
 *
 * An ECMAScript global is reached by writing it — `Math` — and that is the
 * whole of what a script may write bare. Everything else is imported and
 * spliced, so a name the framework or an app provides needs a host value to be
 * imported as.
 * This is that value, and it carries the name and nothing else, as the
 * `Builtin` node it stands for does.
 *
 * What it holds is a value and not only a function: a name may stand for
 * storage a client owns as readily as for something to call, and a target
 * grouping what it offers does it by handing over one name holding several
 * members rather than by writing a name with a dot in it.
 */
export interface Builtin<
  T extends ClientValue = ClientValue,
> extends Client<T> {
  readonly "@backtickjs": "Builtin";
  readonly name: string;
}

export function isBuiltin(value: unknown): value is Builtin {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "Builtin"
  );
}

// `Client` is branded with a symbol nothing outside `Client.ts` can write, so
// what makes one says so here rather than every holder being asked to prove it.
// `T` is what the schema declares the name holds; nothing here can check the
// two agree, and the client answering for the name is what does.
export function createBuiltin<T extends ClientValue>(name: string): Builtin<T> {
  return {
    "@backtickjs": "Builtin",
    name,
  } as unknown as Builtin<T>;
}
