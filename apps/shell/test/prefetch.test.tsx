import { expect, test } from "@jest/globals";
import { Link, Stack } from "expo-router";
import { internalNavigationEvents } from "expo-router/build/global-state/internalNavigationEvents";
import { renderRouter } from "expo-router/testing-library";
import { Text } from "react-native";

// RouteScreen.tsx learns each `<Link prefetch>` from this private event, and
// its route's params, so an expo-router upgrade that changes it fails here,
// not on phones.
test("expo-router reports each <Link prefetch> with its route's params", async () => {
  const params: unknown[] = [];
  const stop = internalNavigationEvents.addListener(
    "actionDispatched",
    (event) => {
      if (event.actionType === "PRELOAD") {
        params.push((event.payload as { params?: unknown }).params);
      }
    },
  );
  await renderRouter({
    _layout: () => <Stack />,
    index: () => (
      <>
        <Link href="/a" prefetch>
          A
        </Link>
        <Link href="/b/?c=d%20e" prefetch>
          B
        </Link>
      </>
    ),
    "[...backtickPath]": () => <Text>route</Text>,
  });
  stop();
  expect(params).toEqual([
    { backtickPath: ["a"] },
    { backtickPath: ["b"], c: "d e" },
  ]);
});
