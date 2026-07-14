import type { ClientBoolean } from "./ClientBoolean.js";
import type { ClientNumber } from "./ClientNumber.js";
import type { ClientObject } from "./ClientObject.js";
import type { ClientString } from "./ClientString.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { Spliceable, Spliced } from "./Spliceable.js";

// What a member-access receiver reads as.
export type Virtualized<T extends ClientUnknown> =
  // A primitive receiver autoboxes to its client type, so its members
  // resolve against the explicit client API
  T extends string
    ? ClientString
    : T extends number
      ? ClientNumber
      : T extends boolean
        ? ClientBoolean
        : T extends ClientObject
          ? {
              // Keep the constraint homomorphic (`keyof T`, filtering in `as`) so
              // properties stay linked to their declarations for go-to-definition.
              [K in keyof T as K extends "@backtickjs"
                ? never
                : T[K] extends Spliceable
                  ? K
                  : never]: Spliced<T[K]>;
            }
          : T;
