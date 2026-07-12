// The explicit opt-in for reflected host classes: declaring the marker
// (`readonly "@backtickjs" = "ClientObject";`) makes an instance spliceable,
// reflected as a plain object of its spliceable members — `Lower` derives
// that shape from the class itself (see `AsObject`).
export interface ClientObject {
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
