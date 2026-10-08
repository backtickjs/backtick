import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Note } from "../scripts-in-depth/server/Data.js";
import { total } from "../scripts-in-depth/server/formatted.js";
import { Home as LiveHome } from "../scripts-in-depth/server/LiveSection.js";
import { Home as LogHome } from "../scripts-in-depth/server/Log.js";
import { type MenuOnPhone, names } from "../scripts-in-depth/server/menu.js";
import { Home as RowsHome } from "../scripts-in-depth/server/Rows.js";
import { double, greeting, meal } from "../scripts-in-depth/server/shapes.js";
import { assertBundle, drawScreen } from "./drawScreen.js";

it("three shapes: each is what it computes", async () => {
  assert.match(
    String(await drawScreen(greeting)),
    /^Good (morning|afternoon)$/,
  );
  assert.match(String(await drawScreen(meal)), /^(Breakfast|Lunch)$/);
  const doubled = (await drawScreen(double)) as unknown as (
    n: number,
  ) => number;
  assert.equal(doubled(21), 42);
});

it("three shapes: a script built from another", async () => {
  assert.equal(await drawScreen(total), "$8.50");
});

it("reading a script: a block runs at each read, a function at each call", async () => {
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

it("reading a script: a memo component made once keeps its state", async () => {
  render(await drawScreen(<RowsHome />));
  await userEvent.click(screen.getByText("row 0"));
  await userEvent.click(screen.getByText("list 0"));
  assert.ok(screen.getByText("list 1"));
  assert.ok(screen.getByText("row 1"));
});

it("a script in data arrives as what it computes", async () => {
  const onPhone: MenuOnPhone = [{ name: "Tea", price: 2, available: true }];
  assert.equal(onPhone[0]!.available, true);
  assert.ok(
    ((await drawScreen(names)) as unknown as string[]).includes("Flat white"),
  );
});

it("client code handed to a server component: the title follows the phone's state", async () => {
  render(await drawScreen(<LiveHome />));
  await userEvent.click(screen.getByText("♡"));
  await userEvent.click(screen.getByText("Add"));
  assert.ok(screen.getByText("1 in your cart"));
  assert.ok(screen.getByText("♥"));
});

it("data, never code: a string is data, whatever it holds", async () => {
  const text = '"); require("fs").rmSync("/"); ("';
  const code = await assertBundle(
    new URL("../scripts-in-depth/server/Data.bundle.js", import.meta.url),
    <Note text={text} />,
  );
  assert.ok(!code.includes('require("fs")'));
  render(await drawScreen(<Note text={text} />));
  assert.ok(screen.getByText(text));
});
