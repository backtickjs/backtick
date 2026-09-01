import type { ServerComponent } from "./ServerComponent.js";

/**
 * Children with no element of their own: what it holds goes where it stands.
 *
 * A component, and nothing but — it answers with its children, which is what
 * "goes where it stands" means. So there is nothing to recognise it by and no
 * rule that reads it: a tag naming one is a tag naming a component, wherever it
 * was written. The name is here rather than the `ServerComponent` it aliases
 * because a target exports one, and a reader of that export is owed what it is
 * for.
 *
 * Each target still makes its own, since what a fragment may hold is whatever
 * that target draws, and `Props` is where it says so.
 */
export type Fragment<Props extends object = object> = ServerComponent<Props>;

export function createFragment<Props extends object>(): Fragment<Props> {
  return (async (props: { children?: unknown }) =>
    props.children) as unknown as Fragment<Props>;
}
