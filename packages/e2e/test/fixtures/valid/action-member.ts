import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

// A holder can carry an action, but the action doesn't ship — curated
// reflection skips it, so only the value members reach the client.
class Button implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly label: Client<string>;
  readonly press: Client<void>;

  constructor(label: Client<string>, press: Client<void>) {
    this.label = label;
    this.press = press;
  }
}

const press = cs`{
  const x = 1;
}`;

export default cs`{
  const button = ${new Button(cs`"OK"`, press)};
  return button.label;
}`;
