export interface ClientObject /* extends Client<this> */ {
  readonly "@backtickjs": "ClientObject";
}

// A client-constructible class: the bundler runs the constructor at bundle
// time — one opaque hole per declared parameter — and serializes the
// instance it returns as a function of those holes (see `lowerSpliceable`),
// so the class itself never leaves the host and a construction is a plain
// call of that function. The `never[]` parameters make every concrete
// constructor assignable (parameters check contravariantly); the bundler's
// call side casts to the hole-taking form it invokes.
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
