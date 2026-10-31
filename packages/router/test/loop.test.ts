import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import {
  arrived,
  back,
  cancel,
  configure,
  dismissTo,
  navigate,
  navigationState,
  reload,
} from "../dist/loop.js";

const passing = {
  dismiss() {},
  dismissAll() {},
  canGoBack: () => true,
  canDismiss: () => true,
  setParams() {},
};

let loads: {
  href: string;
  signal: AbortSignal;
  finish: () => void;
  fail: () => void;
}[];
let shown: [string, string, string?][];
const settled = () => new Promise((resolve) => setTimeout(resolve));

beforeEach(() => {
  cancel();
  arrived.clear();
  loads = [];
  shown = [];
  configure({
    load: (href, signal) =>
      new Promise((resolve, reject) => {
        loads.push({
          href,
          signal,
          finish: () => resolve(href),
          fail: () => reject(new Error(href)),
        });
      }),
    push: (href, screen) => shown.push(["push", href, screen]),
    replace: (href, screen) => shown.push(["replace", href, screen]),
    back: () => shown.push(["back", ""]),
    dismissTo: (href) => shown.push(["dismissTo", href]),
    ...passing,
    reload: () => Promise.resolve(),
  });
});

test("a screen shows only once it has arrived", async () => {
  navigate("push", "/day");
  assert.equal(navigationState(), "loading");
  await settled();
  assert.deepEqual(shown, []);
  loads[0]!.finish();
  await settled();
  assert.equal(navigationState(), "idle");
  assert.equal(shown[0]![0], "push");
  assert.equal(shown[0]![1], "/day");
});

test("what was fetched waits under its key, already settled", async () => {
  navigate("replace", "/day");
  loads[0]!.finish();
  await settled();
  assert.equal(shown[0]![0], "replace");
  const screen = arrived.get(shown[0]![2]!) as unknown as {
    status: string;
    value: unknown;
  };
  assert.equal(screen.status, "fulfilled");
  assert.equal(screen.value, "/day");
});

test("a failure is shown too, without fetching again", async () => {
  navigate("push", "/day");
  loads[0]!.fail();
  await settled();
  assert.equal(loads.length, 1);
  const screen = arrived.get(shown[0]![2]!) as unknown as {
    status: string;
  };
  assert.equal(screen.status, "rejected");
});

test("pressing the same link twice runs its route once", () => {
  navigate("push", "/day");
  navigate("push", "/day");
  assert.equal(loads.length, 1);
  assert.equal(loads[0]!.signal.aborted, false);
});

test("another link aborts the first, which never shows", async () => {
  navigate("push", "/day");
  navigate("push", "/week");
  assert.equal(loads[0]!.signal.aborted, true);
  loads[0]!.finish();
  loads[1]!.finish();
  await settled();
  assert.deepEqual(
    shown.map(([, href]) => href),
    ["/week"],
  );
});

test("back aborts what's on its way", async () => {
  navigate("push", "/day");
  back();
  assert.equal(loads[0]!.signal.aborted, true);
  loads[0]!.finish();
  await settled();
  assert.deepEqual(shown, [["back", ""]]);
  assert.equal(navigationState(), "idle");
});

test("dismissTo fetches nothing: the screen below stays", () => {
  dismissTo("/");
  assert.equal(loads.length, 0);
  assert.deepEqual(shown, [["dismissTo", "/"]]);
});

test("a reload is a navigation in progress, and survives failing", async () => {
  configure({
    load: () => Promise.resolve(null),
    push() {},
    replace() {},
    back() {},
    dismissTo() {},
    ...passing,
    reload: () => Promise.reject(new Error("offline")),
  });
  const reloading = reload();
  assert.equal(navigationState(), "loading");
  await reloading;
  assert.equal(navigationState(), "idle");
});
