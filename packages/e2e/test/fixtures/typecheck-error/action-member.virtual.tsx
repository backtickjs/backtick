import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

// An action member never ships, so a script can't read it — stored or
// performed, the member doesn't exist on the client.
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

export const stored = cs.lift((() => {
    const __cs_button = cs.const(cs.splice(new Button(cs.lift(cs.const("OK")), press)));
    const __cs_handler = cs.const(cs.receiver(__cs_button).press);
    return cs.const(1);
})());

export const performed = cs.lift((() => {
    const __cs_button = cs.const(cs.splice(new Button(cs.lift(cs.const("OK")), press)));
    cs.statement(cs.receiver(__cs_button).press());
})());
