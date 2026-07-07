import type { Client, Visitor } from "./index.js";

export abstract class ClientObject implements Client<ClientObject> {
  declare $$type: this;

  visit<U>(_visitor: Visitor<U>): U {
    throw new Error("A ClientObject lowers by reflection, not `visit()`.");
  }
}
