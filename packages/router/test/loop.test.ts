import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import {
  arrived,
  back,
  cancel,
  configure,
  leftScreen,
  navigate,
  navigationState,
  reload,
} from "../dist/loop.js";

const passing = {
  dismiss() {},
  dismissAll() {},
  canGoBack: () => true,
  canDismiss: () => true,
  isShown: (href: string) => href === "/here",
  shownScreen: () => from,
};

let from: string | undefined;
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

test("navigate leaves the screen on top where it is; push adds another", () => {
  navigate("navigate", "/here");
  assert.equal(loads.length, 0);
  navigate("push", "/here");
  assert.equal(loads.length, 1);
});

test("replace after push of the same href isn't lost", () => {
  navigate("push", "/day");
  navigate("replace", "/day");
  assert.equal(loads.length, 2);
  assert.equal(loads[0]!.signal.aborted, true);
});

test("a load that throws is a failure, not a stuck navigation", async () => {
  configure({
    load() {
      throw new Error("no session");
    },
    push: (href, screen) => shown.push(["push", href, screen]),
    replace() {},
    back() {},
    ...passing,
    reload: () => Promise.resolve(),
  });
  navigate("push", "/day");
  await settled();
  assert.equal(navigationState(), "idle");
  assert.equal(shown.length, 1);
});

test("leaving a screen drops what it started, and only that", async () => {
  from = "a";
  navigate("push", "/day");
  from = "b";
  leftScreen("b");
  assert.equal(loads[0]!.signal.aborted, false);
  leftScreen("a");
  assert.equal(loads[0]!.signal.aborted, true);
  assert.equal(navigationState(), "idle");
  loads[0]!.finish();
  await settled();
  assert.deepEqual(shown, []);
});

test("cancel ends a hung reload", async () => {
  let signal: AbortSignal | undefined;
  configure({
    load: () => Promise.resolve(null),
    push() {},
    replace() {},
    back() {},
    ...passing,
    reload(aborted) {
      signal = aborted;
      return new Promise(() => {});
    },
  });
  void reload();
  assert.equal(navigationState(), "loading");
  cancel();
  assert.equal(signal!.aborted, true);
  assert.equal(navigationState(), "idle");
});

test("a reload is a navigation in progress, and survives failing", async () => {
  configure({
    load: () => Promise.resolve(null),
    push() {},
    replace() {},
    back() {},
    ...passing,
    reload: () => Promise.reject(new Error("offline")),
  });
  const reloading = reload();
  assert.equal(navigationState(), "loading");
  await reloading;
  assert.equal(navigationState(), "idle");
});
