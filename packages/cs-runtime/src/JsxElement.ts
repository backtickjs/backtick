import type { JsxElementType } from "./JsxElementType.js";

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it.
 */
export interface JsxElement {
  readonly "@backtickjs": "JsxElement";
  readonly type: JsxElementType;
  readonly key: string | number | null;
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
  type: JsxElementType,
  props: { [key: string]: unknown },
  key?: string | number,
): JsxElement {
  if (key !== undefined && typeof key !== "string" && typeof key !== "number") {
    throw new Error("Key must be a string or a number");
  }
  return {
    "@backtickjs": "JsxElement",
    type,
    key: key ?? null,
    props,
  } as unknown as JsxElement;
}
