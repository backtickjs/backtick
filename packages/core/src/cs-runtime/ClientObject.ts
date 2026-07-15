import type { Client } from "./Client.js";
import type { ClientUnknown } from "./ClientUnknown.js";

export interface ClientObject /* extends Client<this> */ {
  readonly "@backtickjs": "ClientObject";
}

// A client-constructible class, spliceable only as a `new` callee: the
// bundler runs the constructor at bundle time — one opaque hole per
// argument — and serializes the instance it returns (see `Visitor.new`), so
// the class itself never leaves the host.
export type ClientObjectConstructor = new (
  ...args: Client<ClientUnknown>[]
) => ClientObject;

export function isClientObject(value: unknown): value is ClientObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientObject"
  );
}
