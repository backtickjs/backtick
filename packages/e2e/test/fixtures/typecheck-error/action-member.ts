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

const press = cs`{
  const x = 1;
}`;

export const stored = cs`{
  const button = ${new Button(cs`"OK"`, press)};
  const handler = button.press;
  return 1;
}`;

export const performed = cs`{
  const button = ${new Button(cs`"OK"`, press)};
  button.press();
}`;
