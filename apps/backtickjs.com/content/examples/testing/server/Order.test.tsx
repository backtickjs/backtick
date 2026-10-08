import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Order } from "./Order.js";
import { drawScreen } from "./test/drawScreen.js";

it("counts each item on its own", async () => {
  render(await drawScreen(<Order items={["Flat white", "Latte"]} />));
  await userEvent.click(screen.getByText("Flat white: 0"));
  assert.ok(screen.getByText("Flat white: 1"));
  assert.ok(screen.getByText("Latte: 0"));
});
