import { cs } from "@backtickjs/core";

export default cs.lift(cs.const({ list: cs.splice([1, "two", true, null]) satisfies import("@backtickjs/core").ClientUnknown, obj: cs.splice({ k: 3 }) satisfies import("@backtickjs/core").ClientUnknown }));
