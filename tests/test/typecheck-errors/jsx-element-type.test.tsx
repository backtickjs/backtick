import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";

// What the JSX namespace admits, and what it refuses, in a script.
//
// `JSX.ElementType` admits any `string`. What that does *not* cost is the whole
// of this fixture: a lowercase name is still looked up in `IntrinsicElements`,
// and props are still checked against the type of the tag rather than against
// what `ElementType` allows. The lines that draw something report nothing; the
// rest are in the snapshot beside this, by message, so a rule that changed
// shows as a message that changed.

// ─── what a target draws ──────────────────────────────────────────────
export const tag = cs`<div class="a" />`;

// `blink` is not a tag this target declares
// @ts-expect-error: Property 'blink' does not exist on type 'JSX.IntrinsicElements'.
export const undeclared = cs`<blink />`;

// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
// @ts-expect-error: JSX element type 'NotATag' does not have any construct or call signatures.
export const wrongKind = cs`<$NotATag />`;

// ─── what arranges rather than draws ──────────────────────────────────
export const shorthand = cs`<>
  <span>a</span>
</>`;

export const list = cs`<$For each={[] as number[]}>{(n) => <i>{n}</i>}</$For>`;

// ─── what the app wrote: a server component, on the host ──────────────
const Panel = async () => null;
export const component = <Panel />;

// ─── props, which the tag decides and not `ElementType` ───────────────
// `nosuch` is not an attribute `div` takes
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'HTMLAttributes<HTMLDivElement>'.
export const strayProp = cs`<div nosuch={1} />`;

// `class` is a string, and a number is not one
// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrongType = cs`<div class={1} />`;

// `<>` is the fragment, and `<Fragment>` a tag like any other: here it names
// nothing
// @ts-expect-error: Cannot find name 'Fragment'.
export const named = cs`<$Fragment />`;

// ─── children, which are structure ────────────────────────────────────
export const text = cs`<div>hello</div>`;
export const number = cs`<div>{1}</div>`;
export const nested = cs`<div>
  <span>a</span>
</div>`;
