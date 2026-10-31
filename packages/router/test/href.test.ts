import assert from "node:assert/strict";
import { test } from "node:test";
import { hrefString, isExternal } from "../dist/href.js";

test("a string stays as written", () => {
  assert.equal(hrefString("/day?week=2"), "/day?week=2");
  assert.equal(hrefString("https://x.com/a"), "https://x.com/a");
});

test("a leading // isn't another host", () => {
  assert.equal(hrefString("//x.com"), "/x.com");
});

test("params fill dynamic segments, and the rest are the query", () => {
  assert.equal(
    hrefString({ pathname: "/user/[id]", params: { id: 1, tab: "a b" } }),
    "/user/1?tab=a%20b",
  );
  assert.equal(
    hrefString({ pathname: "/docs/[...rest]", params: { rest: ["a", "b c"] } }),
    "/docs/a/b%20c",
  );
});

test("nullish params are left out, and arrays are joined, as expo-router's", () => {
  assert.equal(
    hrefString({ pathname: "/a", params: { b: null, c: undefined } }),
    "/a",
  );
  assert.equal(
    hrefString({ pathname: "/a", params: { b: ["1", "2"] } }),
    "/a?b=1%2C2",
  );
});

test("a URL scheme is external, a path isn't", () => {
  assert.equal(isExternal("mailto:a@b.c"), true);
  assert.equal(isExternal("/a:b"), false);
});
