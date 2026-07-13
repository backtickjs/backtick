import type { Client } from "./Client.js";
import type { ClientObject } from "./ClientObject.js";
import { cs } from "./cs.js";

// The client string API: what a script may reach on an autoboxed string.
export class ClientString implements ClientObject {
  readonly "@backtickjs": "ClientObject";

  get concat(): Client<(...strings: string[]) => string> {
    return cs`{
      throw "\`concat\` not implemented yet.";
    }` as Client<(...strings: string[]) => string>;
  }

  get toUpperCase(): Client<() => string> {
    return cs`{
      throw "\`toUpperCase\` not implemented yet.";
    }` as Client<() => string>;
  }
}
