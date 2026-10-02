import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { Fragment } from "@backtickjs/solid-js/jsx-runtime";

// What the JSX namespace admits, and what it refuses, in a script.
//
// `JSX.ElementType` admits any `string`. What that does *not* cost is the whole
// of this fixture: a lowercase name is still looked up in `IntrinsicElements`,
// and props are still checked against the type of the tag rather than against
// what `ElementType` allows. The lines that draw something report nothing; the
// rest are in the snapshot beside this, by message, so a rule that changed
// shows as a message that changed.

// ─── what a target draws ──────────────────────────────────────────────
export const tag = cs.lift((() => <div class={"a"}/>)());

// `blink` is not a tag this target declares
// @ts-expect-error: Property 'blink' does not exist on type 'JSX.IntrinsicElements'.
export const undeclared = cs.lift((() => <blink />)());

// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
// @ts-expect-error: JSX element type 'NotATag' does not have any construct or call signatures.
export const wrongKind = cs.lift(((__cs_NotATag = cs.splice(NotATag)) => <__cs_NotATag />)());

// ─── what arranges rather than draws ──────────────────────────────────
export const fragment = cs.lift((() => <Fragment>{<span>a</span>}</Fragment>)());

export const shorthand = cs.lift((() => <>{<span>a</span>}</>)());

export const list = cs.lift(((__cs_For = cs.splice(For)) => <__cs_For each={[] as number[]}>{__cs_n => <i>{__cs_n}</i>}</__cs_For>)());

// ─── what the app wrote: a server component, on the host ──────────────
const Panel = async () => null;
export const component = <Panel />;

// ─── props, which the tag decides and not `ElementType` ───────────────
// `nosuch` is not an attribute `div` takes
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'HTMLAttributes<HTMLDivElement>'.
export const strayProp = cs.lift((() => <div nosuch={1}/>)());

// `class` is a string, and a number is not one
// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrongType = cs.lift((() => <div class={1}/>)());

// a fragment takes children and nothing else
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'IntrinsicAttributes & { children?: unknown; }'.
export const strayFragmentProp = cs.lift((() => <Fragment nosuch={1}/>)());

// ─── children, which are structure ────────────────────────────────────
export const text = cs.lift((() => <div>hello</div>)());
export const number = cs.lift((() => <div>{1}</div>)());
export const nested = cs.lift((() => <div>{<span>a</span>}</div>)());
