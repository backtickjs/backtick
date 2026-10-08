import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Home } from "../quick-start/server/Home.js";
import { drawScreen } from "./drawScreen.js";

it("quick start: the server's time, and a counter on the phone", async () => {
  render(await drawScreen(<Home />));
  assert.ok(screen.getByText(/^Served at /));
  await userEvent.click(screen.getByText("Tapped 0 times"));
  assert.ok(screen.getByText("Tapped 1 times"));
});
