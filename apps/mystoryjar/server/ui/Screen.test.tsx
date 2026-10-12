import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@testing-library/react";
import { drawScreen } from "../test/drawScreen.js";
import { request } from "../test/request.js";
import { Icon } from "./Icon.js";
import { icons } from "./icons.js";
import { Screen } from "./Screen.js";
import { Text } from "./Text.js";

const sample = cs`(
  <>
    <$Text color="secondaryText">
      Hello <$Icon shapes={${icons.pen}} color="accent" />
    </$Text>
    <$Text>Plain</$Text>
  </>
)`;

it("draws its components in the light palette", async () => {
  render(await drawScreen(<Screen request={request}>{sample}</Screen>));
  const text = screen.getByText("Hello");
  assert.equal(getComputedStyle(text).color, "rgb(126, 125, 125)");
  assert.equal(
    text.querySelector("svg")?.getAttribute("data-color"),
    "#E9707D",
  );
  assert.equal(
    getComputedStyle(screen.getByText("Plain")).color,
    "rgb(48, 48, 48)",
  );
});

it("and in the dark one", async () => {
  const { container } = render(
    await drawScreen(
      <Screen request={{ ...request, theme: "dark" }}>{sample}</Screen>,
    ),
  );
  const background = container.firstElementChild as HTMLElement;
  assert.equal(getComputedStyle(background).backgroundColor, "rgb(10, 10, 10)");
  // read from the context, which the screen provides
  assert.equal(
    getComputedStyle(screen.getByText("Plain")).color,
    "rgb(183, 180, 180)",
  );
});
