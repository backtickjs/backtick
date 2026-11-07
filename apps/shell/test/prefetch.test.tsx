import { expect, test } from "@jest/globals";
import { Link, Stack } from "expo-router";
import { internalNavigationEvents } from "expo-router/build/global-state/internalNavigationEvents";
import { renderRouter } from "expo-router/testing-library";
import { Text } from "react-native";

// RouteScreen.tsx learns each `<Link prefetch>` from this private event, so an
// expo-router upgrade that changes it fails here, not on phones.
test("expo-router reports each <Link prefetch> with its path", async () => {
  const paths: unknown[] = [];
  const stop = internalNavigationEvents.addListener(
    "actionDispatched",
    (event) => {
      if (event.actionType === "PRELOAD") {
        paths.push((event.payload as { path?: unknown }).path);
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
        <Link href="/b?c=d" prefetch>
          B
        </Link>
      </>
    ),
    "[...backtickPath]": () => <Text>route</Text>,
  });
  stop();
  expect(paths).toEqual(["/a", "/b?c=d"]);
});
