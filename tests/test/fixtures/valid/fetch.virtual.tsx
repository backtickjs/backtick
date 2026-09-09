import { cs, fetch, state, type Response } from "@backtickjs/core";

// Reading the body is a second turn, the way it is on the web: `fetch` answers
// with a response, and the response is asked for its body.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
export default cs.lift(cs.const(() => {
    const __cs_held = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)("waiting"));
    cs.statement((cs.splice((fetch)) satisfies typeof cs.ClientUnknown)("/cases/built-ins/Math/trunc/Math.trunc_Success", (__cs_response: Response) => {
        if (!(cs.condition(cs.receiver(__cs_response).ok) && cs.receiver(__cs_response).ok)) {
            cs.statement(cs.receiver(__cs_held).write("answered " + cs.receiver(__cs_response).status));
        }
        else {
            cs.statement(cs.receiver(__cs_response).text((__cs_text: string) => {
                cs.statement(cs.receiver(__cs_held).write(__cs_text));
            }, (__cs_reason: string) => {
                cs.statement(cs.receiver(__cs_held).write("the body stopped \u2014 " + __cs_reason));
            }));
        }
    }, (__cs_reason: string) => {
        cs.statement(cs.receiver(__cs_held).write("nothing answered \u2014 " + __cs_reason));
    }, { method: "GET" }));
    return cs.const(cs.receiver(__cs_held).read());
}));
