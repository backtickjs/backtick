import { cs } from "@backtickjs/core";
import type { Spliceable } from "@backtickjs/core";

// A host function has no data form: it can't cross into the client, so bundling
// must fail loudly. The cast pushes a type-invalid value past the splice type
// to reach the runtime check.
export default cs`() => ${(() => null) as unknown as Spliceable}`;
