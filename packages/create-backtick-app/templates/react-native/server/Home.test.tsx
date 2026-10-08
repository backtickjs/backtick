import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home.js";
import { drawScreen } from "./test/drawScreen.js";

it("shows the Node version the server ran", async () => {
  render(await drawScreen(<Home />));
  assert.ok(screen.getByText("Welcome!"));
  assert.ok(screen.getByText(new RegExp(`with Node ${process.version}`)));
});
