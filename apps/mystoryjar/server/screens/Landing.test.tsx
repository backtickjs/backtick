import assert from "node:assert/strict";
import { it } from "node:test";
import { StackActions } from "@react-navigation/routers";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { drawScreen, navigated } from "../test/drawScreen.js";
import { request } from "../test/request.js";
import { Landing } from "./Landing.js";

it("says what MyStoryJar is", async () => {
  render(await drawScreen(<Landing request={request} />));
  assert.ok(screen.getByText("Own every day."));
  assert.ok(screen.getByText("Journaling without the hassle."));
});

it("shows its pictures from the server", async () => {
  const { container } = render(await drawScreen(<Landing request={request} />));
  const sources = [...container.querySelectorAll("img")].map((image) =>
    image.getAttribute("src"),
  );
  assert.ok(sources.includes("http://localhost:3000/assets/sunrise@2x.png"));
});

it("goes to sign in, and to sign up from either button", async () => {
  render(await drawScreen(<Landing request={request} />));
  await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
  await userEvent.click(screen.getByRole("button", { name: "Sign up" }));
  await userEvent.click(screen.getByRole("button", { name: "Get Started" }));
  assert.deepEqual(navigated, [
    StackActions.push("Screen", { path: "/signin" }),
    StackActions.push("Screen", { path: "/signup" }),
    StackActions.push("Screen", { path: "/signup" }),
  ]);
});
