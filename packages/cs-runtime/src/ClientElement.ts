import type { Client } from "./Client.ts";
import type { ClientUnknown } from "./ClientUnknown.ts";

export type Prop<T extends ClientUnknown> = T | Client<T>;

export interface ClientElement {
  readonly "@backtickjs": "ClientElement";
  readonly type: string;
  readonly key: string | number | null;
  readonly props: { [key: string]: unknown };
}

export function isClientElement(value: unknown): value is ClientElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientElement"
  );
}

export function create(
  type: string,
  props: { [key: string]: unknown },
  key?: string | number,
): ClientElement {
  if (key !== undefined && typeof key !== "string" && typeof key !== "number") {
    throw new Error("Key must be a string or a number");
  }
  return {
    "@backtickjs": "ClientElement",
    type,
    key: key ?? null,
    props,
  } as unknown as ClientElement;
}
