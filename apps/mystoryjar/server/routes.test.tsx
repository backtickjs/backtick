import assert from "node:assert/strict";
import { it } from "node:test";
import { StackActions } from "@react-navigation/routers";
import { render, waitFor } from "@testing-library/react";
import { draw, routes } from "./routes.js";
import { AppUpdateRequired } from "./screens/AppUpdateRequired.js";
import { drawScreen, navigated } from "./test/drawScreen.js";
import { request } from "./test/request.js";

const signedIn = {
  ...request,
  user: { uid: "uid-1", email: "ada@example.com", signedInAt: 0 },
};

it("sends someone signed out from Write to sign in", async () => {
  render(await drawScreen(draw(routes["/write"]!, request)));
  await waitFor(() =>
    assert.deepEqual(navigated, [
      StackActions.replace("Screen", { path: "/signin", animation: "none" }),
    ]),
  );
});

it("sends someone signed in from the landing page to Write", async () => {
  render(await drawScreen(draw(routes["/"]!, signedIn)));
  await waitFor(() =>
    assert.deepEqual(navigated, [
      StackActions.replace("Screen", { path: "/write", animation: "none" }),
    ]),
  );
});

it("has no screen at an unknown path", () => {
  assert.equal(routes["/nowhere"], undefined);
});

it("asks a deprecated build to update, drawn with React Native alone", async () => {
  const { getByText } = render(await drawScreen(<AppUpdateRequired />));
  assert.ok(getByText("Update MyStoryJar"));
});
