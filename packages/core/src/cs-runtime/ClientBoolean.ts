import type { Client } from "./Client.js";
import type { ClientObject } from "./ClientObject.js";
import { cs } from "./cs.js";

// The client boolean API: what a script may reach on an autoboxed boolean.
export class ClientBoolean implements ClientObject {
  readonly "@backtickjs": "ClientObject";

  get toString(): Client<() => string> {
    return cs`{
      throw "\`toString\` not implemented yet.";
    }` as Client<() => string>;
  }
}
