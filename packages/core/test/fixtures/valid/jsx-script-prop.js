import { cs } from "@backtickjs/core";
// A script prop references the function table from the tree's JSON via
// `#call`; the free host reference `console` resolves as a `#global` leaf
// instead of threading through the tree's slots.
//
// @ts-expect-error -- the compiler transform supports free host references,
// but its typechecker can't resolve them inside a script body yet; drop this
// once it can.
export default <button onClick={(() => {
    return cs.create({ path: "jsx-script-prop.tsx", start: { line: 10, character: 33 }, end: { line: 10, character: 60 } }, "ugsz0b", { splices: [], captures: ["console"], declarations: [] }, v => v.arrow({ path: "jsx-script-prop.tsx", start: { line: 10, character: 36 }, end: { line: 10, character: 59 } }, [], v.call({ path: "jsx-script-prop.tsx", start: { line: 10, character: 42 }, end: { line: 10, character: 59 } }, v.propertyAccess({ path: "jsx-script-prop.tsx", start: { line: 10, character: 42 }, end: { line: 10, character: 53 } }, v.identifier({ path: "jsx-script-prop.tsx", start: { line: 10, character: 42 }, end: { line: 10, character: 49 } }, "console", "console"), "log"), [v.string({ path: "jsx-script-prop.tsx", start: { line: 10, character: 54 }, end: { line: 10, character: 58 } }, "hi")])));
})()}/>;
