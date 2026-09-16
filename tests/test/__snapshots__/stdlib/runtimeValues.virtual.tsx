import { cs } from "@backtickjs/core";

const runtimeValues = cs.lift(cs.const({ list: cs.splice([1, "two", true, null]) satisfies typeof cs.ClientUnknown, obj: cs.splice({ k: 3 }) satisfies typeof cs.ClientUnknown }));
