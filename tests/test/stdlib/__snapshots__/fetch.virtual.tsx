import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import type { Response } from "@backtickjs/web-sdk";
import { snapshotCase } from "../snapshotCase.ts";

// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("fetchRequests", async (t) => {
  await snapshotCase(
    t,
    "fetchRequests",
    cs.lift(cs.const(() => {
    const __cs_held = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)("waiting"));
    cs.statement(cs.receiver((cs.splice((window)) satisfies typeof cs.ClientUnknown)).fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", (__cs_response: Response) => {
        if (cs.receiver(__cs_response).status !== 200) {
            throw "answered " + cs.receiver(__cs_response).status;
        }
        cs.statement(cs.receiver(__cs_held).set(cs.receiver(JSON).parse(cs.receiver(__cs_response).text) === null ? "null" : "a value"));
    }, (__cs_message: string) => {
        cs.statement(cs.receiver(__cs_held).set("failed \u2014 " + __cs_message));
    }, { timeout: 3000 }));
    cs.statement(cs.receiver((cs.splice((window)) satisfies typeof cs.ClientUnknown)).fetch("/cases", (__cs_response: Response) => {
        cs.statement(cs.receiver(__cs_held).set(cs.receiver(__cs_response).text));
    }, (__cs_message: string) => {
        cs.statement(cs.receiver(__cs_held).set(__cs_message));
    }, { method: "POST", headers: { "content-type": "application/json" }, body: cs.receiver(JSON).stringify({ name: "Math.trunc", passed: true }) }));
    return cs.const(cs.receiver(__cs_held).get());
})),
  );
});
