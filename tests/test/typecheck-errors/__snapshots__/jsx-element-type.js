import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
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
export const tag = cs.create(
  "1giuj76msk4u3:14:19",
  { params: [] },
  '() => <div class="a"/>',
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAasB,MAAA,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAG"}',
);
// `blink` is not a tag this target declares
// @ts-expect-error: Property 'blink' does not exist on type 'JSX.IntrinsicElements'.
export const undeclared = cs.create(
  "1giuj76msk4u3:18:26",
  { params: [] },
  "() => <blink />",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAiB6B,MAAA,CAAC,KAAK,CAAC,AAAD,EAAG"}',
);
// A capitalised tag is looked up as a binding, and `ElementType` is what says
// which bindings may stand there.
const NotATag = { id: "View" };
// a plain object is not a component, a fragment or a list
// @ts-expect-error: JSX element type 'NotATag' does not have any construct or call signatures.
export const wrongKind = cs.create(
  "1giuj76msk4u3:25:25",
  { params: [{ kind: "tag", value: NotATag }] },
  "($tag0) => <$tag0 />",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAwB4B,WAAA,CAAC,KAAO,CAAC,AAAD,EAAG"}',
);
// ─── what arranges rather than draws ──────────────────────────────────
export const shorthand = cs.create(
  "1giuj76msk4u3:28:25",
  { params: [] },
  "() => <>\n  <span>a</span>\n</>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AA2B4B,MAAA,EAC1B;EAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACf;AAAA,GAAG"}',
);
export const list = cs.create(
  "1giuj76msk4u3:32:20",
  { params: [{ kind: "tag", value: For }] },
  "($tag0) => <$tag0 each={[]}>{(n) => <i>{n}</i>}</$tag0>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AA+BuB,WAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,EAAc,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,KAAG,CAAC"}',
);
// ─── what the app wrote: a server component, on the host ──────────────
const Panel = async () => null;
export const component = _jsx(Panel, {});
// ─── props, which the tag decides and not `ElementType` ───────────────
// `nosuch` is not an attribute `div` takes
// @ts-expect-error: Type '{ nosuch: number; }' is not assignable to type 'HTMLAttributes<HTMLDivElement>'.
export const strayProp = cs.create(
  "1giuj76msk4u3:41:25",
  { params: [] },
  "() => <div nosuch={1}/>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAwC4B,MAAA,CAAC,GAAG,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,EAAG"}',
);
// `class` is a string, and a number is not one
// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrongType = cs.create(
  "1giuj76msk4u3:45:25",
  { params: [] },
  "() => <div class={1}/>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AA4C4B,MAAA,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAG"}',
);
// `<>` is the fragment, and `<Fragment>` a tag like any other: here it names
// nothing
// @ts-expect-error: Cannot find name 'Fragment'.
export const named = cs.create(
  "1giuj76msk4u3:50:21",
  { params: [{ kind: "tag", value: Fragment }] },
  "($tag0) => <$tag0 />",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAiDwB,WAAA,CAAC,KAAQ,CAAC,AAAD,EAAG"}',
);
// ─── children, which are structure ────────────────────────────────────
export const text = cs.create(
  "1giuj76msk4u3:53:20",
  { params: [] },
  "() => <div>hello</div>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAoDuB,MAAA,CAAC,GAAG,CAAC,KAAK,EAAE,GAAG,CAAC"}',
);
export const number = cs.create(
  "1giuj76msk4u3:54:22",
  { params: [] },
  "() => <div>{1}</div>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAqDyB,MAAA,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC"}',
);
export const nested = cs.create(
  "1giuj76msk4u3:55:22",
  { params: [] },
  "() => <div>\n  <span>a</span>\n</div>",
  '{"version":3,"file":"jsx-element-type.test.jsx","sourceRoot":"","sources":["typecheck-errors/jsx-element-type.test.tsx"],"names":[],"mappings":"AAsDyB,MAAA,CAAC,GAAG,CAC3B;EAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACf;AAAA,EAAE,GAAG,CAAC"}',
);
