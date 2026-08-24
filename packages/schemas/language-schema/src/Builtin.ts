import type { Client } from "./Client.js";
import type { ClientFunction } from "./schema.generated.js";

/**
 * A name the client answers for, held as a value.
 *
 * A builtin is reached by writing it — `Math.floor` — and that is the whole of
 * what a script may write bare. Everything else is imported and spliced, so a
 * name the framework or an app provides needs a host value to be imported as.
 * This is that value, and it carries the name and nothing else, as the
 * `Builtin` node it stands for does.
 */
export interface Builtin<
  F extends ClientFunction = ClientFunction,
> extends Client<F> {
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
// `F` is the signature the schema declares for the name; nothing here can check
// the two agree, and the client answering for the name is what does.
export function createBuiltin<F extends ClientFunction>(
  name: string,
): Builtin<F> {
  return {
    "@backtickjs": "Builtin",
    name,
  } as unknown as Builtin<F>;
}
