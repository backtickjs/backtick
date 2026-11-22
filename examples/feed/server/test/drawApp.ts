import { type Bundle, createRuntime } from "@backtickjs/core";
import * as ReactQuery from "@tanstack/react-query";
import { render } from "@testing-library/react";
import * as React from "react";
import { act, createElement, Suspense } from "react";
import * as ReactErrorBoundary from "react-error-boundary";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";
import installedPackages from "../../installed-packages.json" with { type: "json" };
import { app } from "../app.js";

// The app's web build, as client/backtick.ts says, with React Native's web build
// standing in for React Native: it sends its modules, at the versions the app
// installs, as the app does.
const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNativeWeb,
  "@tanstack/react-query": ReactQuery,
  "react-error-boundary": ReactErrorBoundary,
  "react-native-safe-area-context": { SafeAreaView: ReactNativeWeb.View },
};
// One for the test, as the app has one, answered by the server itself.
const runtime = createRuntime({
  moduleMap,
  installedPackages,
  fetch: (request) => app.fetch(request),
});

/** The requests the app made, in order: `GET /`, `GET /pages/1`… */
export const requests: string[] = [];

/** Paths whose requests fail, as a server that's down for them would. */
export const failing = new Set<string>();

/** What the server answers at `path`, run as the app's `fetchBundle` runs it. */
export async function fetchBundle(
  path: string,
  init: { method?: string; body?: unknown } = {},
) {
  const method = init.method ?? "GET";
  const { body } = init;
  if (failing.has(path)) throw new Error("unreachable");
  requests.push(`${method} ${path}${body ? " " + JSON.stringify(body) : ""}`);
  const response = await runtime.fetch(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return runtime.exec((await response.text()) as Bundle<unknown>);
}

/**
 * The screen at `path`, fetched and run as the app runs it, and drawn by
 * Testing Library: inside an awaited `act`, as React draws a tree that
 * suspends only there.
 */
export async function drawApp(path = "/"): Promise<void> {
  const screen = await fetchBundle(path);
  // as the app's `createQueryClient` makes it, but trying a failed request
  // only once, and keeping what it read without a timer to forget it, which
  // would hold the test open
  const client = new ReactQuery.QueryClient({
    defaultOptions: {
      queries: {
        queryFn: ({ queryKey: [path], pageParam }) =>
          fetchBundle((pageParam ?? path) as string),
        retry: false,
        gcTime: Infinity,
      },
      mutations: {
        mutationFn: (variables) => {
          const { path, body } = variables as { path: string; body?: unknown };
          return fetchBundle(path, { method: "POST", body: body ?? null });
        },
        gcTime: Infinity,
      },
    },
  });
  await act(async () => {
    render(
      createElement(
        ReactQuery.QueryClientProvider,
        { client },
        createElement(Suspense, { fallback: null }, screen as React.ReactNode),
      ),
    );
  });
}
