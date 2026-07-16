import { cs } from "@backtickjs/core";
class Point {
    "@backtickjs" = "ClientObject";
    x;
    constructor(x) {
        this.x = x;
    }
}
// A host helper generic over the client object it splices: `Spliced<T>`
// defers over the unresolved type parameter, so the annotated return type
// errors — the documented cost of `cs.splice` losing its `ClientObject`
// identity overload. A concretely typed splice reduces fine (see
// `spliced-param`), and the runtime is unaffected either way.
function wrap(value) {
    return cs.create({ path: "spliced-generic.ts", start: { line: 20, character: 10 }, end: { line: 20, character: 28 } }, "b58d56", { splices: { $0splice0: value }, captures: [], declarations: [] }, v => v.arrow({ path: "spliced-generic.ts", start: { line: 20, character: 13 }, end: { line: 20, character: 27 } }, [], v.splice({ path: "spliced-generic.ts", start: { line: 20, character: 19 }, end: { line: 20, character: 27 } }, "$0splice0")));
}
export default cs.create({ path: "spliced-generic.ts", start: { line: 23, character: 16 }, end: { line: 23, character: 49 } }, "b58d56", { splices: { $0splice0: wrap(new Point(cs.create({ path: "spliced-generic.ts", start: { line: 23, character: 36 }, end: { line: 23, character: 41 } }, "b58d56", { splices: {}, captures: [], declarations: [] }, v => v.number({ path: "spliced-generic.ts", start: { line: 23, character: 39 }, end: { line: 23, character: 40 } }, 7)))) }, captures: [], declarations: [] }, v => v.propertyAccess({ path: "spliced-generic.ts", start: { line: 23, character: 19 }, end: { line: 23, character: 48 } }, v.call({ path: "spliced-generic.ts", start: { line: 23, character: 19 }, end: { line: 23, character: 46 } }, v.splice({ path: "spliced-generic.ts", start: { line: 23, character: 19 }, end: { line: 23, character: 44 } }, "$0splice0"), []), "x"));
