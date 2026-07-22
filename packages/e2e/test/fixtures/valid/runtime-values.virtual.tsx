import { cs } from "@backtickjs/core";

export default cs.lift(cs.const({ list: cs.splice([1, "two", true, null]), obj: cs.splice({ k: 3 }) }));
