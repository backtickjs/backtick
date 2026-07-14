import type { Client } from "./Client.js";
import type { ClientObject } from "./ClientObject.js";
import { cs } from "./cs.js";

// The client number API: what a script may reach on an autoboxed number.
export class ClientNumber implements ClientObject {
  readonly "@backtickjs": "ClientObject";

  get toString(): Client<(radix?: number) => string> {
    // @ts-expect-error
    return cs`(radix?: number) => {
      throw "\`toString\` not implemented yet.";
    }`;
  }
}
