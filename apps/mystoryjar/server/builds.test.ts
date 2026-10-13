import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  DeprecatedBuild,
  installed,
  packagesOf,
  supports,
  UnknownBuild,
  unregistered,
} from "./builds.js";
import { packagesHash, platforms, readModuleMap } from "./packages.js";
import { screenRequestOf } from "./request.js";

it("knows the builds this code makes, on every platform", () => {
  // Fails after a package change until it's recorded: run
  // `pnpm register-build` and commit the files it writes, so the server
  // keeps bundling for these builds once the code moves on.
  for (const platform of platforms) {
    assert.equal(unregistered(platform), null);
  }
});

it("gives the web build no native sign-in SDK", () => {
  assert.ok(supports(installed.ios, "react-native-fbsdk-next", "*"));
  assert.ok(!supports(installed.web, "react-native-fbsdk-next", "*"));
  assert.ok(
    !supports(installed.web, "@react-native-google-signin/google-signin", "*"),
  );
});

it("resolves a build by the hash it sends", () => {
  assert.deepEqual(packagesOf(packagesHash(installed.web)), installed.web);
  assert.deepEqual(packagesOf(packagesHash(installed.ios)), installed.ios);
  assert.throws(() => packagesOf("0123456789abcdef"), UnknownBuild);
  assert.throws(() => packagesOf(null), UnknownBuild);
});

it("says whether a build carries a package at a version", () => {
  assert.ok(supports(installed.ios, "expo-file-system", "^57.0.7"));
  assert.ok(!supports(installed.ios, "expo-file-system", "^58.0.0"));
  assert.ok(!supports({ react: "19.2.3" }, "expo-file-system", "*"));
});

describe("a module map", () => {
  const read = (source: string) => {
    const file = join(mkdtempSync(join(tmpdir(), "moduleMap-")), "map.ts");
    writeFileSync(file, source);
    return () => readModuleMap(file);
  };

  it("is read as a table of specifiers", () => {
    const map = read(`import type { ModuleMap } from "x";
export const moduleMap = {
  react: () => require("react"),
  "react-native": () => require("react-native"),
} satisfies ModuleMap;`);
    assert.deepEqual(map(), ["react", "react-native"]);
  });

  it("may not decide at runtime", () => {
    const map = read(`export const moduleMap = {
  react: () => require("react"),
  fbsdk: () => (native() ? require("fbsdk") : {}),
};`);
    assert.throws(map, /map\.ts:3: each entry is/);
  });

  it("may hold nothing but the table", () => {
    const map = read(`const native = () => true;
export const moduleMap = {};`);
    assert.throws(map, /map\.ts:1: a module map holds/);
  });
});

it("draws for the build id the app sent, however it sent it", async () => {
  // as a GraphQL resolver would, from its operation's variables
  const sent = {
    origin: "https://api.example.com",
    timeZone: "UTC",
    session: null,
    query: {},
  };
  const web = await screenRequestOf({
    ...sent,
    buildId: packagesHash(installed.web),
  });
  assert.deepEqual(web.packages, installed.web);
  await assert.rejects(
    screenRequestOf({ ...sent, buildId: "unknown" }),
    UnknownBuild,
  );
});

it("refuses a build deprecated on purpose", () => {
  const builds = new Map([
    [
      "old",
      {
        createdAt: "2026-01-01T00:00:00.000Z",
        deprecated: false,
        packages: installed.ios,
      },
    ],
    [
      "retired",
      {
        createdAt: "2025-01-01T00:00:00.000Z",
        deprecated: true,
        packages: installed.ios,
      },
    ],
  ]);
  assert.equal(packagesOf("old", builds), installed.ios);
  assert.throws(() => packagesOf("retired", builds), DeprecatedBuild);
  assert.throws(() => packagesOf("missing", builds), UnknownBuild);
});
