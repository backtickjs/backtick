import type { Client } from "./Client.js";
import type { ClientObject } from "./ClientObject.js";

// Stands in for `typeof ClientObject`: an interface has no class to query,
// so `Spliceable` needs a spelled-out constructor type to admit one.
export type ClientConstructor = new (...args: Client<never>[]) => ClientObject;
