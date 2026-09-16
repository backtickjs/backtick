import {
  jsx as _jsx,
  Fragment as _Fragment,
} from "@backtickjs/web-sdk/jsx-runtime";
import { For } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-sdk";
// What the JSX namespace admits, and what it refuses.
//
// `JSX.ElementType` is `JsxElementType`, which admits any `string`. What
// that does *not* cost is the whole of this fixture: a lowercase name is still
// looked up in `IntrinsicElements`, and props are still checked against the
// type of the tag rather than against what `ElementType` allows. The lines that
// draw something report nothing; the rest are in the snapshot beside this, by
// message, so a rule that changed shows as a message that changed.
// ─── what a target draws ──────────────────────────────────────────────
export const tag = _jsx("div", { class: "a" });
// `blink` is not a tag this target declares
// @ts-expect-error: Property 'blink' does not exist on type 'JSX.IntrinsicElements'.
export const undeclared = _jsx("blink", {});
// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
// @ts-expect-error: JSX element type 'NotATag' does not have any construct or call signatures.
export const wrongKind = _jsx(NotATag, {});
// ─── what arranges rather than draws ──────────────────────────────────
export const fragment = _jsx(Fragment, {
  children: _jsx("span", { children: "a" }),
});
export const shorthand = _jsx(_Fragment, {
  children: _jsx("span", { children: "a" }),
});
export const list = _jsx(For, { each: null, children: null });
// ─── what the app wrote ───────────────────────────────────────────────
const Panel = async () => null;
export const component = _jsx(Panel, {});
// ─── props, which the tag decides and not `ElementType` ───────────────
// `nosuch` is not an attribute `div` takes
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'HtmlProps<HTMLDivElement>'.
export const strayProp = _jsx("div", { nosuch: 1 });
// `class` is a string, and a number is not one
// @ts-expect-error: Type 'number' is not assignable to type 'Prop<string> | undefined'.
export const wrongType = _jsx("div", { class: 1 });
// a fragment takes children and nothing else
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'FragmentProps'.
export const strayFragmentProp = _jsx(Fragment, { nosuch: 1 });
// ─── children, which are structure ────────────────────────────────────
export const text = _jsx("div", { children: "hello" });
export const number = _jsx("div", { children: 1 });
export const nested = _jsx("div", {
  children: _jsx("span", { children: "a" }),
});
// a boolean is not a child the web draws
// @ts-expect-error: Type 'true' is not assignable to type 'Children | undefined'.
export const wrongChild = _jsx("div", { children: true });
// `br` holds nothing, so children are a type error
// @ts-expect-error: Type '{ children: string; }' has no properties in common with type 'VoidProps<HTMLBRElement>'.
export const voidWithChildren = _jsx("br", { children: "text" });
