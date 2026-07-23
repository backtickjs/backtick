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

const press = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export default cs.lift((() => {
    const __cs_button = cs.const(cs.splice(new Button(cs.lift(cs.const("OK")), press)));
    return cs.const(cs.receiver(__cs_button).label);
})());
