import { expect, test } from "@jest/globals";
import { Link, PrefetchProvider, router, Stack } from "@backtickjs/expo-router";
import { act, renderRouter, screen } from "expo-router/testing-library";
import { Text } from "react-native";

// What links and router.prefetch ask the app to fetch ahead, and what
// expo-router's navigation state holds meanwhile: no preloaded route, as the
// fetch is data only.
test("links and router.prefetch fetch ahead through the provider, and nothing preloads", async () => {
  const fetched: [string, string][] = [];
  const fetchAhead = (href: string, options: { kind: string }) => {
    fetched.push([href, options.kind]);
    return () => {};
  };
  const rendered = await renderRouter({
    _layout: () => <Stack />,
    index: () => (
      <PrefetchProvider value={fetchAhead}>
        <Link href="/a">A</Link>
        <Link href="/b/?c=d%20e" prefetch>
          B
        </Link>
        <Link href="/c" prefetch={false}>
          C
        </Link>
      </PrefetchProvider>
    ),
    "[...backtickPath]": () => <Text>route</Text>,
  });
  expect(fetched).toEqual([
    ["/a", "auto"],
    ["/b/?c=d%20e", "full"],
  ]);
  act(() => router.prefetch("/d"));
  expect(fetched.at(-1)).toEqual(["/d", "auto"]);
  const state = rendered.getRouterState();
  expect(state?.routes.length).toBe(1);
  expect(screen.getByText("A")).toBeTruthy();
});
