import { cs } from "@backtickjs/core";

export default cs.liftValue({ list: cs.spliceValue([1, "two", true, null]), obj: cs.spliceValue({ k: 3 }) });
