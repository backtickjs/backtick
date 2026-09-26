import type {
  Builtins as PlatformBuiltins,
  Client,
  ClientHandle,
  ClientValue,
  Elements as PlatformElements,
  Signal,
} from "@backtickjs/platform-sdk";
import type { Children } from "./Children.js";
import type { Prop } from "./Prop.js";

export type {
  ArrayLike,
  ClientFunction,
  ClientHandle,
  ClientUnknown,
  ClientValue,
  Signal,
  SignalOptions,
  State,
} from "@backtickjs/platform-sdk";

declare const BacktickElementBrand: unique symbol;
/**
 * A drawing, as either side names one.
 *
 * Opaque, and that is the whole of it: what a drawing is made of belongs to
 * whichever side made it. A server builds one from a tag and props, and a
 * script evaluates to one — neither reads into the other's.
 */
export interface BacktickElement extends ClientHandle {
  readonly [BacktickElementBrand]: never;
}

/**
 * What may stand where a drawing does: one drawing, several, or nothing.
 *
 * Text and numbers stand for themselves and `null` for nothing, so a client
 * draws these in order and skips the nothings. Nested because a drawing's
 * children may be gathered before they are handed over.
 *
 * That a host may write a script in any of these positions is the host
 * language's and is not said here: what a client meets is a drawing, some
 * text, or several of those.
 */
export type BacktickNode =
  | BacktickElement
  | string
  | number
  | null
  | readonly BacktickNode[];

export interface ForProps<T extends ClientValue> {
  /**
   * The array to draw one thing per member of.
   */
  each: Prop<readonly T[]>;
  /**
   * @param index Where the member is, as storage rather than a number: a
   * position moves without the member changing, so a number read once would go
   * stale.
   */
  children: Client<(member: T, index: Signal<number>) => BacktickElement>;
}

export interface FragmentProps {
  children?: Children;
}

/** The elements this schema declares, and what each accepts. */
export interface UiPlatformElements {
  /**
   * An array, and what to draw for one member of it.
   *
   * `children` is a script whose value is a function, so the client walks the
   * array itself: it draws only the members that are new and moves the rest
   * rather than rebuilding them. A member is named by its own identity — there
   * is no key.
   *
   * A member is `ClientValue` here where it is `T` on the props, because a tag
   * has nowhere to bind a type parameter. Write `<For />` to have the child
   * checked against what `each` holds.
   */
  for: ForProps<ClientValue>;
  /**
   * Children with no element of their own: what it holds goes where it stands.
   *
   * What it is for is the position. A drawing that is not an element has
   * nowhere to be watched — a conditional standing at a block's root is read
   * inside whatever computation asked for it, and the write that answers the
   * conditional runs the block again. Under a fragment the conditional is a
   * child, and a child position is watched on its own.
   *
   * Written `<>`, which TypeScript resolves to this name. Capitalized where
   * `for` is not, because a lowercase first letter is what makes a tag a
   * target's own — so no target can declare an element named this.
   */
  Fragment: FragmentProps;
}

/** Every element in scope, this schema's own and its bases'. */
export interface Elements extends PlatformElements, UiPlatformElements {}

/** What this schema declares, which is what its own client answers for. */
export interface UiPlatformBuiltins {
  /**
   * Registers a cleanup function on the current scope: the drawing the calling
   * script belongs to, or the `computed` it is called in. The cleanup runs
   * when that scope is disposed, as when the drawing is removed, or refreshed,
   * as when the computed calculates again.
   *
   * Called from a handler, there is no current scope, and the cleanup never
   * runs.
   *
   * @param fn The cleanup to run.
   */
  onCleanup(fn: () => void): void;
  /**
   * Runs something once, after the drawing the calling script belongs to is in
   * place — the moment to start a timer or listen on the window.
   *
   * Called from a script that draws, as a statement before its `return`.
   * Called from a handler, the drawing is already in place and it runs
   * straight away.
   *
   * @param fn What to run once the drawing is in place.
   */
  onMount(fn: () => void): void;
}

/** What a client must answer with, for every name in scope. */
export interface Builtins extends PlatformBuiltins, UiPlatformBuiltins {}
