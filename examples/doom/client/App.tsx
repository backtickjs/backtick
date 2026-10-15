import type { Bundle } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  type ReactNode,
  Suspense,
  use,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import { ActivityIndicator, AppState, Text } from "react-native";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { Fiber } from "./fiber";

// What a screen may require: the packages this app was built with.
const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "@react-three/fiber/native": Fiber,
};

// Your Backtick server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = `http://${host}:3000`;

// A screen as fetched, with what each stage of getting it cost so far:
// `Screen` adds the render and logs the whole pipeline.
type Fetched = {
  path: string;
  node: ReactNode;
  started: number;
  server: Record<string, number>;
  firstByte: number;
  downloaded: number;
  evaluated: number;
  bytes: number;
  heap: { started?: Heap; evaluated?: Heap };
};

// The screen at `path` on your server: its bundle, fetched and run with the
// app's packages. Your fetch to shape: headers, auth, caching.
async function fetchScreen(path: string): Promise<Fetched> {
  const heap = { started: readHeap() };
  const started = performance.now();
  const response = await fetch(`${server}${path}`);
  const firstByte = performance.now();
  if (!response.ok) {
    throw new Error(`${path} answered ${response.status}.`);
  }
  const bundle = (await response.text()) as Bundle<ReactNode>;
  const downloaded = performance.now();
  const node = await execRoot(bundle, moduleMap);
  const evaluated = performance.now();
  return {
    path,
    node,
    started,
    server: readServerTiming(response.headers.get("server-timing")),
    firstByte,
    downloaded,
    evaluated,
    bytes: bundle.length,
    heap: { ...heap, evaluated: readHeap() },
  };
}

export default function App() {
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it.
  const [screen] = useState(() => fetchScreen("/game"));
  // The OS asking the app to free memory: the moment to know what the heap
  // held.
  useEffect(() => {
    const subscription = AppState.addEventListener("memoryWarning", () =>
      console.warn(`[memory] warning from the OS, ${formatHeap(readHeap())}`),
    );
    return () => subscription.remove();
  }, []);
  // The whole game, its levels included, comes from the server: see
  // server/Game.tsx.
  return (
    <>
      <ErrorBoundary FallbackComponent={Failed}>
        <Suspense
          fallback={
            <ActivityIndicator style={{ flex: 1, backgroundColor: "#000" }} />
          }
        >
          <Screen screen={screen} />
        </Suspense>
      </ErrorBoundary>
      <StatusBar hidden />
    </>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, a screen that couldn't be fetched or run. Its first commit
// ends the pipeline, which it logs: a layout effect runs once the screen is
// committed, in production too, where React's <Profiler> reports nothing.
function Screen({ screen }: { screen: Promise<Fetched> }) {
  const fetched = use(screen);
  useLayoutEffect(() => logPipeline(fetched), [fetched]);
  return fetched.node;
}

function logPipeline(fetched: Fetched) {
  const committed = performance.now();
  const server = Object.values(fetched.server).reduce((a, b) => a + b, 0);
  const serverStages = Object.entries(fetched.server)
    .map(([name, duration]) => `${name} ${ms(duration)}`)
    .join(", ");
  const heap = readHeap();
  console.log(
    [
      `[pipeline] ${fetched.path} in ${ms(committed - fetched.started)}`,
      `  server    ${ms(server)} (${serverStages || "no Server-Timing"})`,
      `  network   ${ms(fetched.firstByte - fetched.started - server)} to first byte, ` +
        `${ms(fetched.downloaded - fetched.firstByte)} to download ${kb(fetched.bytes)}`,
      `  evaluate  ${ms(fetched.evaluated - fetched.downloaded)}`,
      `  render    ${ms(committed - fetched.evaluated)} to commit`,
      `  heap      ${formatHeap(fetched.heap.started)} at fetch, ` +
        `${formatHeap(fetched.heap.evaluated)} after evaluate, ` +
        `${formatHeap(heap)} after commit`,
    ].join("\n"),
  );
}

// `build;dur=12.3, generate;dur=0.8` as { build: 12.3, generate: 0.8 }.
function readServerTiming(header: string | null): Record<string, number> {
  const stages: Record<string, number> = {};
  for (const metric of header?.split(",") ?? []) {
    const [name, ...params] = metric.trim().split(";");
    const duration = params.find((param) => param.trim().startsWith("dur="));
    if (name && duration) stages[name] = Number(duration.split("=")[1]);
  }
  return stages;
}

// The JS heap as Hermes, React Native's engine, reports it, or as Chrome
// does on the web, without its collections. Native memory, GL buffers and
// textures included, isn't visible from JavaScript.
type Heap = { allocated: number; size: number; collections?: number };

function readHeap(): Heap | undefined {
  const hermes = (
    globalThis as {
      HermesInternal?: { getInstrumentedStats?: () => Record<string, number> };
    }
  ).HermesInternal;
  const stats = hermes?.getInstrumentedStats?.();
  if (stats) {
    return {
      allocated: stats.js_allocatedBytes ?? 0,
      size: stats.js_heapSize ?? 0,
      collections: stats.js_numGCs ?? 0,
    };
  }
  const chrome = (
    performance as {
      memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
    }
  ).memory;
  if (chrome) {
    return { allocated: chrome.usedJSHeapSize, size: chrome.totalJSHeapSize };
  }
  return undefined;
}

function formatHeap(heap: Heap | undefined): string {
  if (!heap) return "heap unknown";
  const collections =
    heap.collections === undefined ? "" : `, ${heap.collections} GCs`;
  return `${mb(heap.allocated)} of ${mb(heap.size)}${collections}`;
}

const ms = (value: number) => `${value.toFixed(1)} ms`;
const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

// Why the screen couldn't be drawn: the server unreachable, or a screen the
// app can't run.
function Failed({ error }: FallbackProps) {
  return (
    <Text style={{ margin: 24, marginTop: 96, color: "#b91c1c" }}>
      {getErrorMessage(error) ?? String(error)}
      {"\n\n"}Is your Backtick server running? npm start runs it alongside Expo.
    </Text>
  );
}
