import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Home as QuickStartHome } from "../quick-start/server/Home.js";
import { Home as ThinkingHome } from "../thinking/server/Home.js";
import { Signup } from "../thinking/server/Signup.js";
import { Signup as SignupFixed } from "../thinking-fixed/server/Signup.js";
import { Promo } from "../optional/server/Promo.js";
import { bundleScreen, drawScreen } from "./drawScreen.js";

it("quick start: the server's time, and a counter on the phone", async () => {
  render(await drawScreen(<QuickStartHome />));
  assert.ok(screen.getByText(/^Served at /));
  await userEvent.click(screen.getByText("Tapped 0 times"));
  assert.ok(screen.getByText("Tapped 1 times"));
});

it("thinking: a greeting, and a reorder button", async () => {
  render(await drawScreen(<ThinkingHome user={{ id: "u-7", name: "Sam" }} />));
  assert.ok(screen.getByText("Good morning, Sam"));
  await userEvent.click(screen.getByText("Reorder Flat white"));
  assert.ok(screen.getByText("Added ✓"));
});

// What the page shows the phone receiving is what the server sends: written
// with `UPDATE=1`, checked otherwise.
it("thinking: the bundle shown is the bundle built", async () => {
  const { code } = await bundleScreen(
    <ThinkingHome user={{ id: "u-7", name: "Sam" }} />,
  );
  const file = new URL("../thinking/bundle.js", import.meta.url);
  if (process.env.UPDATE) {
    writeFileSync(file, code);
  }
  assert.equal(readFileSync(file, "utf8"), code);
});

it("thinking: what can't cross is refused when bundling too", async () => {
  await assert.rejects(bundleScreen(<Signup />), {
    message:
      /^Can't splice the host function `track`: it's host code, and only runs on the host\./,
  });
});

it("thinking: the fix crosses a string and a script", async () => {
  render(await drawScreen(<SignupFixed />));
  assert.ok(screen.getByText("Opens Tue Oct 06 2026"));
});

it("optional: a banner only for a user with an offer", async () => {
  render(await drawScreen(<Promo userId="u-7" />));
  assert.ok(screen.getByText("2 for 1 cold brew"));
  render(await drawScreen(<Promo userId="u-8" />));
  assert.equal(screen.queryAllByText("2 for 1 cold brew").length, 1);
});
