declare const SignalBrand: unique symbol;
/**
 * Storage a script may read but not replace.
 *
 * What a position is in a list is one of these, and so is a cell handed to a
 * component that only displays it: the signature says which way the value
 * travels, and a `State` goes wherever one of these is wanted.
 */
export interface Signal<T> extends ClientHandle {
  readonly [SignalBrand]: never;
  get(): T;
}

declare const StateBrand: unique symbol;
/**
 * A cell as a script reads it.
 *
 * What makes one is not here: `state` is a client function a script imports
 * and splices, so a cell is what calling it answers with. This is the half
 * that reaches the client.
 *
 * `set` stores what it is given, a function included: it never calls it.
 */
export interface State<T> extends Signal<T> {
  readonly [StateBrand]: never;
  set(value: T): void;
}

/**
 * How a signal decides that a new value is a change.
 */
export interface SignalOptions<T> {
  /**
   * Whether `next` counts as the same value as `previous`. When it does,
   * whatever reads the signal isn't updated. Compared with `===` when left
   * out.
   */
  equals?(previous: T, next: T): boolean;
}

declare const ClientHandleBrand: unique symbol;
/**
 * Something the client owns, and that nothing here reads into.
 *
 * A script may hold one and hand it back and nothing else: what it is made of
 * is the client's, and two clients need not agree on that to agree on this.
 * Every opaque type is one — `State` is a handle, and so is anything a client
 * answers with that this format does not describe.
 */
export interface ClientHandle {
  readonly [ClientHandleBrand]: never;
}

/**
 * A function a client holds. What it takes is nothing this format describes —
 * a client hands one what it was given — and what it answers with is a client
 * value, or nothing.
 */
export type ClientFunction = (...args: never[]) => ClientUnknown;

/**
 * A client value, or nothing. What an action answers with, where every other
 * position takes a value.
 */
export type ClientUnknown = ClientValue | void;

/**
 * What may cross between a host and a client: data, a function, or a handle to
 * something the client owns.
 */
export type ClientValue =
  | null
  | undefined
  | number
  | boolean
  | string
  | { readonly [key: string]: ClientValue }
  | readonly ClientValue[]
  | ClientFunction
  | ClientHandle;

export interface ArrayLike<T extends ClientValue> {
  readonly length: number;
  readonly [n: number]: T;
}

/** The elements this schema declares, and what each accepts. */
export interface PlatformElements {}

/** Every element in scope, this schema's own and its bases'. */
export interface Elements extends PlatformElements {}

/** What this schema declares, which is what its own client answers for. */
export interface PlatformBuiltins {
  /**
   * Creates a `State`, a `Signal` a script can both `get` and `set`, and the
   * foundation of Backtick's reactivity. Whatever reads it with `get` follows
   * it — a prop, a child, a `computed` — and a `set` runs those readers again
   * and nothing else. Reading is cheap and setting does the work, so a state
   * suits values read often and set less often.
   *
   * Created while a script draws, it lasts as long as that drawing.
   *
   * @param initial The value it holds until the first `set`.
   */
  state<T>(initial: T, options?: SignalOptions<T>): State<T>;
  /**
   * Creates a read-only `Signal` that derives its value from other signals.
   * The calculated value is memoized: `fn` runs when the computed is created
   * and again only when a signal it read changes, and every `get` reuses the
   * result. If the new result equals the previous one (`===`, or
   * `options.equals`), the computed doesn't update whatever reads it.
   *
   * Created while a script draws, it lasts as long as that drawing.
   *
   * @param fn Calculates the value from the signals it reads.
   */
  computed<T>(fn: () => T, options?: SignalOptions<T>): Signal<T>;
}

/** What a client must answer with, for every name in scope. */
export interface Builtins extends PlatformBuiltins {}
