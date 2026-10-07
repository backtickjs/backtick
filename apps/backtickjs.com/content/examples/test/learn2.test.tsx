import assert from "node:assert/strict";
import { afterEach, beforeEach, it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import * as ReactNativeWeb from "react-native-web";
import { Cart } from "../client-components/server/Cart.js";
import { ProductPage } from "../composing/server/ProductPage.js";
import { Home as OtherPackagesHome } from "../other-packages/server/Home.js";
import { Store } from "../react-native-apis/server/Store.js";
import { drawScreen } from "./drawScreen.js";

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

const opened: string[] = [];
const realOpen = window.open;
beforeEach(() => {
  opened.length = 0;
  window.open = (url) => {
    opened.push(String(url));
    return null;
  };
});
afterEach(() => {
  window.open = realOpen;
});

// React Native's web build says it's `web`, which isn't iOS, and opens a web
// address with `window.open`; a `tel:` one it opens in place, so the call link
// is left untested.
it("react native apis: the platform's maps, opened by Linking", async () => {
  render(await drawScreen(<Store />));
  assert.ok(screen.getByText("Backtick Coffee"));
  assert.ok(screen.getByText("Call +15550100"));
  await userEvent.click(screen.getByText("Open in Google Maps"));
  assert.deepEqual(opened, [
    "https://www.google.com/maps/search/?api=1&query=1%20Main%20St%2C%20Portland",
  ]);
});

it("other packages: the app's haptics and gradient, through createImport", async () => {
  const impacts: unknown[] = [];
  const LinearGradient = (props: {
    colors: string[];
    children?: React.ReactNode;
  }) =>
    React.createElement(
      ReactNativeWeb.View,
      { testID: "gradient" },
      props.children,
    );
  render(
    await drawScreen(<OtherPackagesHome />, {
      "expo-haptics": {
        version: "57.0.3",
        module: {
          impactAsync: async (...args: unknown[]) => impacts.push(args),
        },
      },
      "expo-linear-gradient": { version: "57.0.2", module: { LinearGradient } },
    }),
  );
  assert.ok(screen.getByTestId("gradient"));
  await userEvent.click(screen.getByText("Tap to feel it"));
  assert.equal(impacts.length, 1);
});
