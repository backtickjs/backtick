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
export const undeclared = _jsx("blink", {});
// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
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
export const strayProp = _jsx("div", { nosuch: 1 });
// `class` is a string, and a number is not one
export const wrongType = _jsx("div", { class: 1 });
// a fragment takes children and nothing else
export const strayFragmentProp = _jsx(Fragment, { nosuch: 1 });
// ─── children, which are structure ────────────────────────────────────
export const text = _jsx("div", { children: "hello" });
export const number = _jsx("div", { children: 1 });
export const nested = _jsx("div", {
  children: _jsx("span", { children: "a" }),
});
// a boolean is not a child the web draws
export const wrongChild = _jsx("div", { children: true });
// `br` holds nothing, so children are a type error
export const voidWithChildren = _jsx("br", { children: "text" });
