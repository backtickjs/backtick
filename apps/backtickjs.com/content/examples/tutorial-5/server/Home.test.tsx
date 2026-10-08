import assert from "node:assert/strict";
import { afterEach, beforeEach, it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Home } from "./Home.js";
import { saveOrder } from "./orders.js";
import { drawScreen } from "./test/drawScreen.js";

// The phone's `fetch`, answered here rather than by your server.
const sent: string[] = [];
const realFetch = globalThis.fetch;
beforeEach(() => {
  sent.length = 0;
  globalThis.fetch = async (_url, init) => {
    sent.push(String(init?.body));
    return new Response();
  };
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

it("totals the order, and places it", async () => {
  render(await drawScreen(<Home origin="http://test" />));
  await userEvent.click(screen.getByText("$4.50"));
  await userEvent.click(screen.getByText("$4.00"));
  assert.ok(screen.getByText("2 in your order · $8.50"));
  await userEvent.click(screen.getByText("Place order"));
  assert.ok(await screen.findByText("Ordered ✓"));
  assert.deepEqual(JSON.parse(sent[0]!), { "flat-white": 1, cortado: 1 });
});

it("starts from the usual", async () => {
  await saveOrder({ "flat-white": 2 });
  render(await drawScreen(<Home origin="http://test" />));
  assert.ok(screen.getByText("Your usual: 2 × Flat white"));
  assert.ok(screen.getByText("2 in your order · $9.00"));
});
