import { cs } from "@backtickjs/core";
async function fetchGreeting() {
    return "hello";
}
// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here at module top level.
export default cs.create({ path: "await-in-splice.ts", start: { line: 10, character: 16 }, end: { line: 10, character: 50 } }, "1705ege", { splices: { $0splice0: await fetchGreeting() }, captures: [], declarations: [] }, v => v.binop({ path: "await-in-splice.ts", start: { line: 10, character: 19 }, end: { line: 10, character: 49 } }, v.splice({ path: "await-in-splice.ts", start: { line: 10, character: 19 }, end: { line: 10, character: 43 } }, "$0splice0"), "+", v.string({ path: "await-in-splice.ts", start: { line: 10, character: 46 }, end: { line: 10, character: 49 } }, "!")));
