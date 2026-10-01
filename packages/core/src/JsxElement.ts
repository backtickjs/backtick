import type { Client } from "./Client.js";

/**
 * What a JSX tag evaluates to on the server, before bundling resolves it: the
 * tag and its props, which are the server's own. What a drawing is, is the
 * adapter's; this is what the bundler expands. A client value, of the type its
 * adapter names (Solid's: its element), so a host may hand one over wherever
 * a drawing may stand.
 */
export interface JsxElement extends Client<unknown> {
  readonly "@backtickjs": "JsxElement";
  readonly type: string | ((props: never) => unknown);
  readonly props: unknown;
}

export function isJsxElement(value: unknown): value is JsxElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "JsxElement"
  );
}

export function createJsxElement(
  type: string | ((props: never) => unknown),
  props: unknown,
): JsxElement {
  return { "@backtickjs": "JsxElement", type, props } as JsxElement;
}

// What an adapter's JSX namespace types its `Element` and `ElementType` as,
// given what its framework draws (Solid's `JSX.Element`, React's `ReactNode`).
// One namespace types both a host's JSX and a script's, so each type answers
// for both sides.

/**
 * A JSX expression: in a script, what the framework draws, so it fits the
 * framework's slots; on the host, a client value standing for it, so it
 * splices.
 */
export type JsxElementOf<T> = T & Client<T>;

/**
 * What a tag may name: an intrinsic element; a component as a script sees it,
 * answering what the framework draws (a client component, or a server
 * component lowered); or a server component on the host, answering a script
 * that draws, or nothing.
 */
export type JsxElementTypeOf<T> =
  | string
  | ((props: never) => T)
  | ((props: never) => Client<T> | null | Promise<Client<T> | null>);
