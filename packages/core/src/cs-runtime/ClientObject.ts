export interface ClientObject /* extends Client<this> */ {
  readonly "@backtickjs": "ClientObject";
}

export function isClientObject(value: unknown): value is ClientObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientObject"
  );
}
