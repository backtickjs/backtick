import type { Client } from "./Client.js";
import type { ClientUnknown } from "./ClientUnknown.js";

export type Prop<T extends ClientUnknown> = T | Client<T>;

declare const element: unique symbol;
export interface UIElement {
  readonly [element]: typeof element;
}

export interface ClientUIElement extends Client<UIElement> {
  readonly "@backtickjs": "ClientUIElement";
  readonly type: string;
  readonly key: string | number | null;
  readonly props: { [key: string]: unknown };
}

export function isClientUIElement(value: unknown): value is ClientUIElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientUIElement"
  );
}

export function create(
  type: string,
  props: { [key: string]: unknown },
  key?: string | number,
): ClientUIElement {
  if (key !== undefined && typeof key !== "string" && typeof key !== "number") {
    throw new Error("Key must be a string or a number");
  }
  return {
    "@backtickjs": "ClientUIElement",
    type,
    key: key ?? null,
    props,
  } as unknown as ClientUIElement;
}
