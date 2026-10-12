import assert from "node:assert/strict";
import { it } from "node:test";
import { StackActions } from "@react-navigation/routers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Landing } from "./Landing.js";
import { drawScreen, navigated } from "./test/drawScreen.js";

it("goes to sign in", async () => {
  render(await drawScreen(<Landing />));
  await userEvent.click(screen.getByText("Sign in"));
  assert.deepEqual(navigated, [
    StackActions.push("Screen", { path: "/signin" }),
  ]);
});
