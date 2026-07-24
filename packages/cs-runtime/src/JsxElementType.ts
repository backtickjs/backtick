import type { ClientComponent } from "./ClientComponent.js";
import type { ServerComponent } from "./ServerComponent.js";

/**
 * The tag an element was written with, kept as-is until bundling resolves it:
 * a client component names the element the interpreter renders, and a server
 * component is run for the element it builds.
 */
export type JsxElementType =
  | string
  | ClientComponent<never>
  | ServerComponent<never>;
