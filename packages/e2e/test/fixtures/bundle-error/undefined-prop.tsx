import type { Spliceable } from "@backtickjs/core";

// `undefined` has no form on the wire: a key nobody wrote reads as absent, and
// this language has no value that says otherwise. The cast pushes it past the
// prop type to reach the runtime refusal, which names the element and the prop
// it came from.
export default <div class={undefined as unknown as Spliceable} />;
