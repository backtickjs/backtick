import assert from "node:assert/strict";
import { it } from "node:test";
import { updateRequired } from "./builds.js";
import { screenRequestOf } from "./request.js";
import { webModules } from "./test/drawScreen.js";

it("draws for the build this code makes", () => {
  assert.equal(updateRequired(webModules), false);
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
    modules: JSON.stringify(webModules),
  });
  assert.deepEqual(web.modules, webModules);
  // none, as from an app that doesn't send them: the bundler refuses any
  // screen with a client import
  const none = await screenRequestOf({ ...sent, modules: null });
  assert.deepEqual(none.modules, {});
});
