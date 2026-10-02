import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
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
export const tag = cs.create(
  "2uccigbav1864:15:19",
  { params: [] },
  '() => <div class="a"/>',
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAcsB,MAAA,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAG"}',
);
// `blink` is not a tag this target declares
// @ts-expect-error: Property 'blink' does not exist on type 'JSX.IntrinsicElements'.
export const undeclared = cs.create(
  "2uccigbav1864:19:26",
  { params: [] },
  "() => <blink />",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAkB6B,MAAA,CAAC,KAAK,CAAC,AAAD,EAAG"}',
);
// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
// @ts-expect-error: JSX element type 'NotATag' does not have any construct or call signatures.
export const wrongKind = cs.create(
  "2uccigbav1864:26:25",
  { params: [{ kind: "tag", value: NotATag }] },
  "($tag0) => <$tag0 />",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAyB4B,WAAA,CAAC,KAAO,CAAC,AAAD,EAAG"}',
);
// ─── what arranges rather than draws ──────────────────────────────────
export const fragment = cs.create(
  "2uccigbav1864:29:24",
  { params: [] },
  "() => <Fragment>\n  <span>a</span>\n</Fragment>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AA4B2B,MAAA,CAAC,QAAQ,CAClC;EAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACf;AAAA,EAAE,QAAQ,CAAC"}',
);
export const shorthand = cs.create(
  "2uccigbav1864:33:25",
  { params: [] },
  "() => <>\n  <span>a</span>\n</>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAgC4B,MAAA,EAC1B;EAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACf;AAAA,GAAG"}',
);
export const list = cs.create(
  "2uccigbav1864:37:20",
  { params: [{ kind: "tag", value: For }] },
  "($tag0) => <$tag0 each={[]}>{(n) => <i>{n}</i>}</$tag0>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAoCuB,WAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,EAAc,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,KAAG,CAAC"}',
);
// ─── what the app wrote: a server component, on the host ──────────────
const Panel = async () => null;
export const component = _jsx(Panel, {});
// ─── props, which the tag decides and not `ElementType` ───────────────
// `nosuch` is not an attribute `div` takes
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'HTMLAttributes<HTMLDivElement>'.
export const strayProp = cs.create(
  "2uccigbav1864:46:25",
  { params: [] },
  "() => <div nosuch={1}/>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AA6C4B,MAAA,CAAC,GAAG,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,EAAG"}',
);
// `class` is a string, and a number is not one
// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrongType = cs.create(
  "2uccigbav1864:50:25",
  { params: [] },
  "() => <div class={1}/>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAiD4B,MAAA,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAG"}',
);
// a fragment takes children and nothing else
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'IntrinsicAttributes & { children?: unknown; }'.
export const strayFragmentProp = cs.create(
  "2uccigbav1864:54:33",
  { params: [] },
  "() => <Fragment nosuch={1}/>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAqDoC,MAAA,CAAC,QAAQ,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,EAAG"}',
);
// ─── children, which are structure ────────────────────────────────────
export const text = cs.create(
  "2uccigbav1864:57:20",
  { params: [] },
  "() => <div>hello</div>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAwDuB,MAAA,CAAC,GAAG,CAAC,KAAK,EAAE,GAAG,CAAC"}',
);
export const number = cs.create(
  "2uccigbav1864:58:22",
  { params: [] },
  "() => <div>{1}</div>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAyDyB,MAAA,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC"}',
);
export const nested = cs.create(
  "2uccigbav1864:59:22",
  { params: [] },
  "() => <div>\n  <span>a</span>\n</div>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AA0DyB,MAAA,CAAC,GAAG,CAC3B;EAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACf;AAAA,EAAE,GAAG,CAAC"}',
);
