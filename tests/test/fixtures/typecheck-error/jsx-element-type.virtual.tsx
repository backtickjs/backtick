import { For } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-schema";

// What the JSX namespace admits, and what it refuses.
//
// `JSX.ElementType` is `BacktickElementType`, which admits any `string`. What
// that does *not* cost is the whole of this fixture: a lowercase name is still
// looked up in `IntrinsicElements`, and props are still checked against the
// type of the tag rather than against what `ElementType` allows. The lines that
// draw something report nothing; the rest are in the snapshot beside this, by
// message, so a rule that changed shows as a message that changed.

// ─── what a target draws ──────────────────────────────────────────────
export const tag = <div class="a" />;

// `blink` is not a tag this target declares
export const undeclared = <blink />;

// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
export const wrongKind = <NotATag />;

// ─── what arranges rather than draws ──────────────────────────────────
export const fragment = (
  <Fragment>
    <span>a</span>
  </Fragment>
);

export const shorthand = (
  <>
    <span>a</span>
  </>
);

export const list = <For each={null as never}>{null as never}</For>;

// ─── what the app wrote ───────────────────────────────────────────────
const Panel = async () => null;
export const component = <Panel />;

// ─── props, which the tag decides and not `ElementType` ───────────────
// `nosuch` is not an attribute `div` takes
export const strayProp = <div nosuch={1} />;

// `class` is a string, and a number is not one
export const wrongType = <div class={1} />;

// a fragment takes children and nothing else
export const strayFragmentProp = <Fragment nosuch={1} />;

// ─── children, which are structure ────────────────────────────────────
export const text = <div>hello</div>;
export const number = <div>{1}</div>;
export const nested = (
  <div>
    <span>a</span>
  </div>
);

// a boolean is not a child the web draws
export const wrongChild = <div>{true}</div>;

// `br` holds nothing, so children are a type error
export const voidWithChildren = <br>text</br>;
