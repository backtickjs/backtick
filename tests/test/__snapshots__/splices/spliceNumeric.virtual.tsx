import { cs } from "@backtickjs/core";

const spliceNumeric = cs.lift(cs.const(cs.splice(1) satisfies typeof cs.ClientUnknown));
