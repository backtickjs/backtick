declare const SerializedBundleBrand: unique symbol;

/**
 * A bundle as the text it is on the wire, and what it is, said as a function:
 * what it has to be handed, and the drawing it answers with.
 *
 *     const rows = JSON.stringify(bundle) as SerializedBundle<Rows>;
 *
 * Still a string — it is fetched, stored, spliced and drawn as one, and nothing
 * reads the parameter at runtime. What it buys is that `<Backtick />` can check
 * the props against what the bundle takes without anybody writing a type
 * argument: the type travels with the text.
 *
 * A claim, not a check. A bundle arrives after the compiler that wrote it is
 * gone, so nothing here can confirm the text takes a `T` any more than
 * `JSON.parse` can confirm a shape — which is why the brand is required rather
 * than optional. A plain string is not one of these until somebody writes that
 * it is, in host code, at the boundary where the bytes were already trusted.
 * A script cannot write it: `cs` has no `as`.
 */
export type SerializedBundle<T> = string & {
  readonly [SerializedBundleBrand]: T;
};
