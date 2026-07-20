import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

// An action is not data: a bare action can't ride into a construction as an
// argument — handlers are functions, which are values.
class Holder implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly press: Client<void>;

  constructor(press: Client<void>) {
    this.press = press;
  }
}

const action = cs`{
  const x = 1;
}`;

export const held = cs`{
  const h = new $Holder($action);
  return 1;
}`;
