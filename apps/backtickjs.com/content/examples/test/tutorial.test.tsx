import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Home as Home1 } from "../tutorial-1/server/Home.js";
import { Home as Home2 } from "../tutorial-2/server/Home.js";
import { Home as Home3 } from "../tutorial-3/server/Home.js";
import { Home as Home4 } from "../tutorial-4/server/Home.js";
import { Home as Home5 } from "../tutorial-5/server/Home.js";
import { saveOrder } from "../tutorial-5/server/orders.js";
import { drawScreen } from "./drawScreen.js";

// Each step of the tutorial does what its page says, tapped through as a
// reader would.

it("1 shows the menu, with prices", async () => {
  render(await drawScreen(<Home1 />));
  assert.ok(screen.getByText("Menu"));
  assert.ok(screen.getByText("Flat white"));
  assert.ok(screen.getByText("$4.50"));
});

it("2 counts each coffee on its own", async () => {
  render(await drawScreen(<Home2 />));
  const [flatWhite] = screen.getAllByText("Add");
  await userEvent.click(flatWhite!);
  await userEvent.click(screen.getByText("Added 1"));
  assert.ok(screen.getByText("Added 2"));
  assert.equal(screen.getAllByText("Add").length, 2);
});

it("3 totals the order across the screen", async () => {
  render(await drawScreen(<Home3 />));
  assert.ok(screen.getByText("Tap a price to add it."));
  await userEvent.click(screen.getByText("$4.50"));
  await userEvent.click(screen.getByText("1 ×"));
  await userEvent.click(screen.getByText("$4.00"));
  assert.ok(screen.getByText("3 in your order · $13.00"));
});

describe("with the server", () => {
  const sent: { url: string; body: string }[] = [];
  const realFetch = globalThis.fetch;
  beforeEach(() => {
    sent.length = 0;
    globalThis.fetch = async (url, init) => {
      sent.push({ url: String(url), body: String(init?.body) });
      return new Response();
    };
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it("4 sends the order to the server", async () => {
    render(await drawScreen(<Home4 origin="http://192.168.1.20:3000" />));
    assert.equal(screen.queryByText("Place order"), null);
    await userEvent.click(screen.getByText("$5.00"));
    await userEvent.click(screen.getByText("Place order"));
    assert.ok(await screen.findByText("Ordered ✓"));
    assert.deepEqual(sent, [
      {
        url: "http://192.168.1.20:3000/orders",
        body: JSON.stringify({ "cold-brew": 1 }),
      },
    ]);
  });

  it("5 shows the usual, and starts the order with it", async () => {
    render(await drawScreen(<Home5 origin="http://localhost:3000" />));
    assert.equal(screen.queryByText(/Your usual/), null);

    await saveOrder({ "flat-white": 2, cortado: 1 });
    render(await drawScreen(<Home5 origin="http://localhost:3000" />));
    assert.ok(screen.getByText("Your usual: 2 × Flat white, 1 × Cortado"));
    assert.ok(screen.getByText("3 in your order · $13.00"));
    await userEvent.click(screen.getByText("Place order"));
    assert.deepEqual(
      sent.map((order) => order.body),
      [JSON.stringify({ "flat-white": 2, cortado: 1 })],
    );
  });
});

// The tutorial's server is the template's, with its new lines added: none of
// the template's is gone or changed.
it("4's server is the template's, with lines added", () => {
  const template = readFileSync(
    new URL(
      "../../../../../packages/create-backtick-app/templates/react-native/server/index.tsx",
      import.meta.url,
    ),
    "utf8",
  ).split("\n");
  const tutorial = readFileSync(
    new URL("../tutorial-4/server/index.tsx", import.meta.url),
    "utf8",
  ).split("\n");
  let at = 0;
  const missing = template.filter((line) => {
    const found = tutorial.indexOf(line, at);
    if (found === -1) {
      return true;
    }
    at = found + 1;
    return false;
  });
  assert.deepEqual(missing, [
    "      const bundle = await bundler.build({ input: <Home />, packageVersions });",
  ]);
});
