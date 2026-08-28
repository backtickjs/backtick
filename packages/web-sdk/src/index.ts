export * as client from "@backtickjs/web-client";
export { insert } from "./insert.js";

/**
 * What this target answers for, beside the language's own.
 *
 * Values rather than types: a script splices one the way it splices `state`,
 * and the client hands over what it stands for. The schema names them and
 * `web-client` is what answers.
 */
export {
  addEventListener,
  console,
  performance,
  removeEventListener,
} from "@backtickjs/web-schema";

/**
 * What this target draws with, and what it hands a handler.
 *
 * Here rather than beside the JSX runtime next door: `jsx-runtime` is a name
 * TypeScript resolves for itself — `jsxImportSource` looks for `jsx`, `jsxs`
 * and `Fragment` at exactly that path — so it is a module written for a
 * compiler to find, not for anybody to import from. What a person writing a
 * component needs is a package name.
 *
 * The event names are the DOM's on purpose, and that is the reason they are
 * exported at all: a browser's `PointerEvent` is a global, and a bare name in a
 * script reaches the global. Importing one of these shadows it, which is the
 * difference between annotating a handler's parameter and being told two types
 * with one name are unrelated.
 */
export { Fragment } from "./jsx-runtime/index.js";
export type { FragmentProps, JSX } from "./jsx-runtime/index.js";
export type {
  AnimationEvent,
  ClipboardEvent,
  CompositionEvent,
  DragEvent,
  ErrorEvent,
  Event,
  EventTarget,
  FocusEvent,
  HtmlNode,
  InputEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ProgressEvent,
  SubmitEvent,
  ToggleEvent,
  TouchEvent,
  TransitionEvent,
  UIEvent,
  WheelEvent,
} from "@backtickjs/web-schema";
