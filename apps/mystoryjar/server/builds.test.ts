import assert from "node:assert/strict";
import { it } from "node:test";
import { supports } from "@backtickjs/bundler";
import { installed, updateRequired } from "./builds.js";
import { screenRequestOf } from "./request.js";

it("gives the web build no native sign-in SDK", () => {
  const ios = installed("ios");
  const web = installed("web");
  assert.ok(supports(ios, "react-native-fbsdk-next", "*"));
  assert.ok(!supports(web, "react-native-fbsdk-next", "*"));
  assert.ok(!supports(web, "@react-native-google-signin/google-signin", "*"));
});

it("draws for the builds this code makes", () => {
  for (const platform of ["ios", "android", "web"] as const) {
    assert.equal(updateRequired(installed(platform)), false);
  }
});

it("draws for the modules the app sent, however it sent them", async () => {
  // as a GraphQL resolver would, from its operation's variables
  const sent = {
    origin: "https://api.example.com",
    timeZone: "UTC",
    session: null,
    query: {},
  };
  const web = await screenRequestOf({
    ...sent,
    modules: JSON.stringify(installed("web")),
  });
  assert.deepEqual(web.modules, installed("web"));
  await assert.rejects(
    screenRequestOf({ ...sent, modules: null }),
    /No modules were sent/,
  );
});
