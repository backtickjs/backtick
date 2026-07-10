import { cs } from "@backtickjs/core";

export default cs.lift({ list: cs.lower([1, "two", true, null]), obj: cs.lower({ k: 3 }) });
