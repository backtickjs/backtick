import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Cart } from "../thinking/server/Cart.js";
import { Catalog } from "../thinking/server/catalog.js";
import { Home } from "../thinking/server/Home.js";
import { ProductPage } from "../thinking/server/ProductPage.js";
import { ProductScreen } from "../thinking/server/ProductScreen.js";
import { Promo } from "../thinking/server/Promo.js";
import { Signup } from "../thinking/server/Signup.js";
import { Greeting } from "../thinking/server/Whole.js";
import { Signup as SignupFixed } from "../thinking-fixed/server/Signup.js";
import { assertBundle, bundleScreen, drawScreen } from "./drawScreen.js";

it("one screen: a greeting, and a reorder button", async () => {
  render(await drawScreen(<Home user={{ id: "u-7", name: "Sam" }} />));
  assert.ok(screen.getByText("Good morning, Sam"));
  await userEvent.click(screen.getByText("Reorder Flat white"));
  assert.ok(screen.getByText("Added ✓"));
});

const catalog = new Catalog();

it("server components: a product, or a message when it's gone", async () => {
  render(await drawScreen(<ProductScreen id="p1" catalog={catalog} />));
  assert.ok(screen.getByText("Ceramic dripper"));
  assert.ok(screen.getByText("In stock"));
  render(await drawScreen(<ProductScreen id="p2" catalog={catalog} />));
  assert.ok(screen.getByText("Sold out"));
  render(await drawScreen(<ProductScreen id="nope" catalog={catalog} />));
  assert.ok(screen.getByText("This product is gone."));
});

it("server components: only what's spliced ships", async () => {
  const { code } = await bundleScreen(
    <ProductScreen id="p1" catalog={catalog} />,
  );
  assert.ok(code.includes('"Ceramic dripper"'));
  assert.ok(!code.includes("cost") && !code.includes("stock:"));
});

it("splices: what can't cross is refused when bundling too", async () => {
  await assert.rejects(bundleScreen(<Signup />), {
    message:
      /^Can't splice the host function `track`: it's host code, and only runs on the host\./,
  });
});

it("splices: the fix crosses a string and a script", async () => {
  render(await drawScreen(<SignupFixed />));
  assert.ok(screen.getByText("Opens Tue Oct 06 2026"));
});

it("splices: `$user.name` ships the whole user", async () => {
  const code = await assertBundle(
    new URL("../thinking/server/Whole.bundle.js", import.meta.url),
    <Greeting user={{ id: "u1", name: "Ada", email: "ada@example.com" }} />,
  );
  assert.ok(code.includes("ada@example.com"));
});

it("splices: a banner only for a user with an offer", async () => {
  render(await drawScreen(<Promo userId="u-7" />));
  assert.ok(screen.getByText("2 for 1 cold brew"));
  render(await drawScreen(<Promo userId="u-8" />));
  assert.equal(screen.queryAllByText("2 for 1 cold brew").length, 1);
});

it("client components: a stepper per line, its state in the list", async () => {
  render(await drawScreen(<Cart />));
  assert.ok(screen.getByText("Flat white"));
  await userEvent.click(screen.getAllByText("+")[0]!);
  await userEvent.click(screen.getAllByText("+")[0]!);
  assert.deepEqual(
    screen.getAllByText(/^\d$/).map((count) => count.textContent),
    ["3", "1"],
  );
  await userEvent.click(screen.getAllByText("−")[0]!);
  assert.equal(screen.getAllByText(/^\d$/)[0]!.textContent, "2");
});

it("composing: a client button beside server-drawn reviews", async () => {
  render(await drawScreen(<ProductPage productId="p1" />));
  assert.ok(screen.getByText("Reviews"));
  assert.ok(screen.getByText("Sam: Even extraction, every time."));
  await userEvent.click(screen.getByText("♡ Like"));
  assert.ok(screen.getByText("♥ Liked"));
});
