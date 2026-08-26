import { cs } from "@backtickjs/core";

// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
export default cs.lift(cs.const(() => cs.splice({ "#call": "#f0" }) satisfies import("@backtickjs/core").ClientUnknown));
