import type { Component } from "./Component.js";
import type { Prop } from "./Prop.js";
import { isSpliceable } from "./Spliceable.js";

export type Key = Prop<string | number>;

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it.
 */
export interface JsxElement {
  readonly "@backtickjs": "JsxElement";
  readonly component: Component;
  readonly key: Key | null;
  readonly props: { [key: string]: unknown };
}

export function isJsxElement(value: unknown): value is JsxElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "JsxElement"
  );
}

export function create(
  component: Component,
  props: { [key: string]: unknown },
  key?: Key,
): JsxElement {
  if (key != null && !isSpliceable(key)) {
    throw new Error("Key must be a string, a number, or a client value.");
  }
  return {
    "@backtickjs": "JsxElement",
    component,
    key: key ?? null,
    props,
  };
}
