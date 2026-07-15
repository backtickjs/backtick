export interface ClientObject /* extends Client<this> */ {
  readonly "@backtickjs": "ClientObject";
}

// A client-constructible class, spliceable only as a `new` callee: the
// bundler runs the constructor at bundle time — one opaque hole per
// argument — and serializes the instance it returns (see `Visitor.new`), so
// the class itself never leaves the host. The `never[]` parameters make
// every concrete constructor assignable (parameters check contravariantly);
// the bundler's call side casts to the hole-taking form it invokes
// (see `expandConstructions`).
export type ClientObjectConstructor = abstract new (
  ...args: never[]
) => ClientObject;

export function isClientObject(value: unknown): value is ClientObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientObject"
  );
}
