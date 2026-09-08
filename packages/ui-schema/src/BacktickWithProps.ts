import { createJsxElement } from "@backtickjs/boundary";
import type {
  BacktickElement,
  ClientValue,
  Prop,
  SerializedBundle,
} from "@backtickjs/boundary";

/**
 * A bundle applied to what it takes, and the result drawn.
 *
 * `P` is what the bundle takes, read off the bundle's own type rather than
 * written: the claim was made where the text was, at the boundary where the
 * bytes were already trusted.
 *
 * One record, because that is the call a function is, and the members are read
 * where the drawn bundle reads them — so a prop written plainly stays live, the
 * same as one on any other component.
 *
 * Beside `<Backtick />` rather than in it: a component reads the props it names
 * and cannot ask whether one was written, so a bundle that takes nothing and one
 * that takes something are drawn by two components.
 */
export async function BacktickWithProps<P extends ClientValue>(props: {
  bundle: Prop<SerializedBundle<(props: P) => BacktickElement> | null>;
  props: Prop<P>;
}): Promise<BacktickElement> {
  return createJsxElement("backtick", {
    bundle: props.bundle,
    props: props.props,
  });
}
