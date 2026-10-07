import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { Home as ClientScriptsHome } from "../client-scripts/server/Home.js";
import { Catalog } from "../server-components/server/catalog.js";
import { ProductScreen } from "../server-components/server/ProductScreen.js";
import { Note } from "../splices/server/Data.js";
import { Profile } from "../splices/server/Profile.js";
import { Greeting } from "../splices/server/Whole.js";
import { assertBundle, drawScreen } from "./drawScreen.js";

const catalog = new Catalog();
const ada = { id: "u1", name: "Ada", email: "ada@example.com" };

it("server components: a product, or a message when it's gone", async () => {
  render(await drawScreen(<ProductScreen id="p1" catalog={catalog} />));
  assert.ok(screen.getByText("Ceramic dripper"));
  assert.ok(screen.getByText("In stock"));
  render(await drawScreen(<ProductScreen id="p2" catalog={catalog} />));
  assert.ok(screen.getByText("Sold out"));
  render(await drawScreen(<ProductScreen id="nope" catalog={catalog} />));
  assert.ok(screen.getByText("This product is gone."));
});

it("server components: only the name and the stock's state ship", async () => {
  const code = await assertBundle(
    new URL(
      "../server-components/server/ProductScreen.bundle.js",
      import.meta.url,
    ),
    <ProductScreen id="p1" catalog={catalog} />,
  );
  assert.ok(code.includes('"Ceramic dripper"'));
  assert.ok(!code.includes("cost") && !code.includes("stock:"));
});

it("client scripts: a greeting by the phone's clock, and a price", async () => {
  render(await drawScreen(<ClientScriptsHome />));
  assert.ok(screen.getByText(/^Good (morning|afternoon)$/));
  assert.ok(screen.getByText("Your total is $13.50."));
});

it("splices: values the server read", async () => {
  render(await drawScreen(<Profile user={ada} />));
  assert.ok(screen.getByText("Ada"));
  assert.ok(screen.getByText("3 orders"));
  assert.ok(screen.getByText("120 points"));
});

it("splices: `$user.name` ships the whole user", async () => {
  const code = await assertBundle(
    new URL("../splices/server/Whole.bundle.js", import.meta.url),
    <Greeting user={ada} />,
  );
  assert.ok(code.includes("ada@example.com"));
});

it("splices: a string is data, whatever it holds", async () => {
  const text = '"); require("fs").rmSync("/"); ("';
  const code = await assertBundle(
    new URL("../splices/server/Data.bundle.js", import.meta.url),
    <Note text={text} />,
  );
  assert.ok(!code.includes('require("fs")'));
  render(await drawScreen(<Note text={text} />));
  assert.ok(screen.getByText(text));
});
