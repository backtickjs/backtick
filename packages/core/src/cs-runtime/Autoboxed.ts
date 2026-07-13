import type { ClientBoolean } from "./ClientBoolean.js";
import type { ClientNumber } from "./ClientNumber.js";
import type { ClientString } from "./ClientString.js";

export type Autoboxed<T> = T extends string
  ? ClientString
  : T extends number
    ? ClientNumber
    : T extends boolean
      ? ClientBoolean
      : T;
