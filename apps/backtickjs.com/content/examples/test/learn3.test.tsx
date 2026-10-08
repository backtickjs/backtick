import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Home as LogHome } from "../client-scripts/server/Log.js";
import { Home as RowsHome } from "../client-components/server/Rows.js";
import { Home as LiveHome } from "../composing/server/LiveSection.js";
import { drawScreen } from "./drawScreen.js";

it("client scripts: a block runs at each read, a function at each call", async () => {
  const logged: string[] = [];
  const log = console.log;
  console.log = (line: string) => logged.push(line);
  try {
    render(await drawScreen(<LogHome />));
  } finally {
    console.log = log;
  }
  assert.deepEqual(logged, ["visit", "visit", "tap a", "tap b"]);
});

it("client components: a memo component made once keeps its state", async () => {
  render(await drawScreen(<RowsHome />));
  await userEvent.click(screen.getByText("row 0"));
  await userEvent.click(screen.getByText("list 0"));
  assert.ok(screen.getByText("list 1"));
  assert.ok(screen.getByText("row 1"));
});

it("composing: a server component's title follows the phone's state", async () => {
  render(await drawScreen(<LiveHome />));
  await userEvent.click(screen.getByText("♡"));
  await userEvent.click(screen.getByText("Add"));
  assert.ok(screen.getByText("1 in your cart"));
  assert.ok(screen.getByText("♥"));
});

// The page shows the template's own server config.
it("type checking: the config shown is the template's", () => {
  const read = (path: string) =>
    readFileSync(new URL(path, import.meta.url), "utf8");
  assert.equal(
    read("../type-checking/server/tsconfig.json"),
    read(
      "../../../../../packages/create-backtick-app/templates/react-native/server/tsconfig.json",
    ),
  );
});
