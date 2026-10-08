import assert from "node:assert/strict";
import { afterEach, beforeEach, it } from "node:test";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as React from "react";
import * as ReactNativeWeb from "react-native-web";
import { Home } from "../react-native-and-packages/server/Home.js";
import { Store } from "../react-native-and-packages/server/Store.js";
import { drawScreen } from "./drawScreen.js";

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
it("react native: the platform's maps, opened by Linking", async () => {
  render(await drawScreen(<Store />));
  assert.ok(screen.getByText("Backtick Coffee"));
  assert.ok(screen.getByText("Call +15550100"));
  await userEvent.click(screen.getByText("Open in Google Maps"));
  assert.deepEqual(opened, [
    "https://www.google.com/maps/search/?api=1&query=1%20Main%20St%2C%20Portland",
  ]);
});

it("packages: the app's haptics and gradient, through createImport", async () => {
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
    await drawScreen(<Home />, {
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
