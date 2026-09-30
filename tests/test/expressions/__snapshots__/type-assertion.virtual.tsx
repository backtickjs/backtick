import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

const answered = '{"rows":["one","two"],"count":2}';

// An assertion is the checker's alone. It is erased on the way to a bundle —
// the runtime here is the expression and nothing else — so a host reading one
// never learns an assertion was written.
//
// `JSON.parse` is why the language has one at all. It answers with
// `ClientValue`, the union of everything a client can hold, and a script that
// means to read `.rows` off what came back has no other way to say what it is
// looking at.
it("typeAssertion", async (t) => {
  await snapshotCase(
    t,
    "typeAssertion",
    cs.lift((() => {
    const __cs_page = cs.globalThis.JSON.parse(cs.splice((answered))) as {
        rows: string[];
        count: number;
    };
    return __cs_page.rows[0] + " of " + __cs_page.count;
})()),
  );
});
