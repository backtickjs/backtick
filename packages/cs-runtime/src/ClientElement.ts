/**
 * What a client component evaluates to: the element that reaches the client.
 * `id` is what the client dispatches on to pick a native component. The key
 * stays on the `JsxElement`, so this is the component's contribution to it.
 */
export interface ClientElement {
  readonly "@backtickjs": "ClientElement";
  readonly id: string;
  readonly props: object;
}

export function isClientElement(value: unknown): value is ClientElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientElement"
  );
}
