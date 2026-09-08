import { createJsxElement } from "@backtickjs/boundary";
import type {
  BacktickElement,
  Prop,
  SerializedBundle,
} from "@backtickjs/boundary";

/**
 * A bundle, drawn here, checked against what it takes.
 *
 * `T` comes from the bundle, which carries what it takes as part of its type —
 * see `SerializedBundle`. Nobody writes it: the claim was made where the text
 * was, at the boundary where the bytes were already trusted.
 *
 * One argument, because props reach a bundle as one record, and always written:
 * a bundle that takes nothing is handed `{}`. A component and not a tag,
 * because a tag has nowhere to hold `T` — the reason `<For />` exists.
 * `<backtick />` still draws a bundle, and checks nothing.
 */
export async function Backtick<
  T extends (props: never) => BacktickElement,
>(props: {
  bundle: Prop<SerializedBundle<T>>;
  props: Parameters<T> extends [] ? Record<string, never> : Parameters<T>[0];
}): Promise<BacktickElement> {
  return createJsxElement("backtick", {
    bundle: props.bundle,
    props: props.props,
  });
}
