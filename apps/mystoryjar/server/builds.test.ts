import assert from "node:assert/strict";
import { it } from "node:test";
import { buildIds, platforms, UnknownBuild } from "@backtickjs/builds";
import { supports } from "@backtickjs/bundler";
import { fileURLToPath } from "node:url";
import { builds } from "./builds.js";
import { screenRequestOf } from "./request.js";

it("knows the builds this code makes, on every platform", () => {
  // Fails after a package change until it's recorded: run
  // `pnpm register-build` and commit the files it writes, so the server
  // keeps bundling for these builds once the code moves on.
  for (const platform of platforms) {
    assert.equal(builds.unregistered(platform), null);
  }
});

it("gives the web build no native sign-in SDK", () => {
  const ios = builds.installed("ios");
  const web = builds.installed("web");
  assert.ok(supports(ios, "react-native-fbsdk-next", "*"));
  assert.ok(!supports(web, "react-native-fbsdk-next", "*"));
  assert.ok(!supports(web, "@react-native-google-signin/google-signin", "*"));
});

it("draws for the build id the app sent, however it sent it", async () => {
  // as a GraphQL resolver would, from its operation's variables
  const sent = {
    origin: "https://api.example.com",
    timeZone: "UTC",
    session: null,
    query: {},
  };
  const ids = buildIds(fileURLToPath(new URL("..", import.meta.url)));
  const web = await screenRequestOf({ ...sent, buildId: ids.web });
  assert.deepEqual(web.packages, builds.installed("web"));
  await assert.rejects(
    screenRequestOf({ ...sent, buildId: "unknown" }),
    UnknownBuild,
  );
});
