import { cs, http, state } from "@backtickjs/core";
import type { HttpResponse } from "@backtickjs/core";

// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
const httpRequests = cs.lift(cs.const(() => {
    const __cs_held = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)("waiting"));
    cs.statement(cs.receiver(cs.splice((http)) satisfies typeof cs.ClientUnknown).get("/cases/built-ins/Math/trunc/Math.trunc_Success", (__cs_response: HttpResponse) => {
        if (cs.receiver(__cs_response).status !== 200) {
            throw "answered " + cs.receiver(__cs_response).status;
        }
        cs.statement(cs.receiver(__cs_held).write(cs.receiver(JSON).parse(cs.receiver(__cs_response).data) === null ? "null" : "a value"));
    }, (__cs_message: string) => {
        cs.statement(cs.receiver(__cs_held).write("failed \u2014 " + __cs_message));
    }, { timeout: 3000 }));
    cs.statement(cs.receiver(cs.splice((http)) satisfies typeof cs.ClientUnknown).post("/cases", cs.receiver(JSON).stringify({ name: "Math.trunc", passed: true }), (__cs_response: HttpResponse) => {
        cs.statement(cs.receiver(__cs_held).write(cs.receiver(__cs_response).data));
    }, (__cs_message: string) => {
        cs.statement(cs.receiver(__cs_held).write(__cs_message));
    }, { headers: { "content-type": "application/json" } }));
    return cs.const(cs.receiver(__cs_held).read());
}));
