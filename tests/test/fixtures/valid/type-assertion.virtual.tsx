import { cs } from "@backtickjs/core";

const answered = '{"rows":["one","two"],"count":2}';

// An assertion is the checker's alone. It is erased on the way to a bundle —
// the runtime here is the expression and nothing else — so a host reading one
// never learns an assertion was written.
//
// `JSON.parse` is why the language has one at all. It answers with
// `ClientValue`, the union of everything a client can hold, and a script that
// means to read `.rows` off what came back has no other way to say what it is
// looking at.
export default cs.lift((() => {
    const __cs_page = cs.const(cs.receiver(JSON).parse(cs.splice((answered)) satisfies typeof cs.ClientUnknown) as {
        rows: string[];
        count: number;
    });
    return cs.const(cs.receiver(cs.receiver(__cs_page).rows)[0] + " of " + cs.receiver(__cs_page).count);
})());
