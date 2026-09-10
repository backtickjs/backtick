import { createJsxElement } from "@backtickjs/ui-schema";
import type { Bundle } from "@backtickjs/language";
import type { Prop } from "@backtickjs/language";
import type { BacktickElement } from "@backtickjs/ui-schema";

/**
 * A bundle, drawn here.
 *
 * For a bundle that is a drawing — one that takes nothing, which is what
 * `bundler.run` gives back for a component that was already applied. A bundle
 * that takes props is drawn with `<BacktickWithProps />`, because a component
 * reads the props it names and cannot ask whether one was written.
 *
 * Null draws nothing, which is what a page between bundles has to say — one
 * being compiled, one not yet fetched.
 *
 * A component and not a tag, because a tag has nowhere to hold a type — the
 * reason `<For />` exists. `<backtick />` still draws a bundle, and checks
 * nothing.
 */
export async function Backtick(props: {
  bundle: Prop<Bundle<BacktickElement> | null>;
}): Promise<BacktickElement> {
  return createJsxElement("backtick", { bundle: props.bundle });
}
