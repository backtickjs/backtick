import { fileURLToPath } from "node:url";
import { installedPackages, modulesOf } from "@backtickjs/builds";
import type { Bundle } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import * as ReactQuery from "@tanstack/react-query";
import { render } from "@testing-library/react";
import * as React from "react";
import { act, createElement, Suspense } from "react";
import * as ReactErrorBoundary from "react-error-boundary";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";
import { app } from "../app.js";

// The app's web build, as client/moduleMap.ts says, with React Native's web build
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
const modules = modulesOf(
  moduleMap,
  installedPackages(fileURLToPath(new URL("../..", import.meta.url))),
);
const headers = { "x-backtick-modules": JSON.stringify(modules) };

/** The requests the app made, in order: `GET /`, `GET /pages/1`… */
export const requests: string[] = [];

async function answer(method: string, path: string, body?: unknown) {
  requests.push(`${method} ${path}${body ? " " + JSON.stringify(body) : ""}`);
  const response = await app.request(path, {
    method,
    headers: { ...headers, "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) throw new Error(await response.text());
  return (await response.text()) as Bundle<unknown>;
}

/** Paths whose requests fail, as a server that's down for them would. */
export const failing = new Set<string>();

/** What the server answers at `path`, run as the app's `fetchBundle` runs it. */
export async function fetchBundle(
  path: string,
  init: { method?: string; body?: unknown } = {},
) {
  if (failing.has(path)) throw new Error("unreachable");
  const bundle = await answer(init.method ?? "GET", path, init.body);
  return execRoot(bundle, moduleMap);
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
