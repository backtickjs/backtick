import type { Client } from "./index.js";

// Base class for authoring a custom client as a class. A `ClientObject` is a
// `Client`, not a `ClientScript`, and carries nothing at runtime — `$$type` is a
// phantom (declared, never emitted). So a spliced instance is just a plain data
// object, which `buildSplice` lowers by reflecting its own enumerable fields into
// a runtime object. `$$type: this` gives each subclass its own nominal type at
// every splice site, so `extends ClientObject` is all it takes.
export abstract class ClientObject implements Client<ClientObject> {
  declare $$type: this;
}
