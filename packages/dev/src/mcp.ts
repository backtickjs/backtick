#!/usr/bin/env node
// `backtick-dev-mcp`: what `backtick-dev` sees of the app, as MCP tools, over
// stdio, for an agent's client to start from a project's `.mcp.json`. It asks
// the `backtick-dev` running on http://localhost:3000, so the tools are
// listed, and say what to do, even before `npm start`.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import type { UIAction } from "./supervisor.js";

// Where `backtick-dev` answers: its port, unless told otherwise.
const origin = process.env.BACKTICK_DEV_ORIGIN ?? "http://localhost:3000";

// `path` on `backtick-dev`, or why it couldn't answer, as a tool's error.
async function ask(
  path: string,
  init?: RequestInit,
): Promise<Response | string> {
  try {
    return await fetch(`${origin}${path}`, init);
  } catch {
    return `Nothing answers at ${origin}: start the app's development with \`npm start\`, which runs backtick-dev.`;
  }
}

const failed = (text: string) => ({
  content: [{ type: "text" as const, text }],
  isError: true,
});

const server = new McpServer({ name: "backtick-dev", version: "0.1.10" });

server.registerTool(
  "screenshot",
  {
    description:
      'A PNG of what the app shows right now, on the phone, simulator or browser running it in development. Saving a file under server/ restarts the server and reloads the app: read `logs` for the app\'s `Running "main"` first, and allow a moment for the screen to load.',
    inputSchema: {
      device: z
        .string()
        .optional()
        .describe(
          "The address of the app to ask, as `devices` lists it. The newest app connected when left out.",
        ),
    },
  },
  async ({ device }) => {
    const query =
      device === undefined ? "" : `?device=${encodeURIComponent(device)}`;
    const response = await ask(`/__backtick/screenshot${query}`);
    if (typeof response === "string") return failed(response);
    if (!response.ok) return failed(await response.text());
    const data = Buffer.from(await response.arrayBuffer()).toString("base64");
    return { content: [{ type: "image", data, mimeType: "image/png" }] };
  },
);

server.registerTool(
  "logs",
  {
    description:
      "One log, numbered, of the app in development: the server's output, the app's console and uncaught errors, with their stacks, and each restart of the server, with the file that changed. Pass the last number read as `since` to read only what came after.",
    inputSchema: {
      since: z
        .number()
        .int()
        .optional()
        .describe(
          "The number of the last entry read. Everything kept when left out.",
        ),
    },
  },
  async ({ since }) => {
    const response = await ask(`/__backtick/logs?since=${since ?? 0}`);
    if (typeof response === "string") return failed(response);
    const text = await response.text();
    return {
      content: [{ type: "text", text: text === "" ? "Nothing new." : text }],
    };
  },
);

server.registerTool(
  "devices",
  {
    description:
      "The apps connected to backtick-dev, by address, and when each connected: whether an app is open to take a screenshot of, and which. A reload connects again.",
  },
  async () => {
    const response = await ask("/__backtick/devices");
    if (typeof response === "string") return failed(response);
    const text = await response.text();
    return {
      content: [
        { type: "text", text: text === "" ? "No app is connected." : text },
      ],
    };
  },
);

// `action` on the app's UI, and what it did, as the tool's answer.
async function act(action: UIAction, device: string | undefined) {
  const query =
    device === undefined ? "" : `?device=${encodeURIComponent(device)}`;
  const response = await ask(`/__backtick/ui${query}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(action),
  });
  if (typeof response === "string") return failed(response);
  const text = await response.text();
  if (!response.ok) return failed(text);
  return { content: [{ type: "text" as const, text }] };
}

const device = z
  .string()
  .optional()
  .describe(
    "The address of the app, as `devices` lists it. The newest app connected when left out.",
  );
const target = z
  .number()
  .int()
  .describe("The element's number, from the latest `inspect`.");

server.registerTool(
  "inspect",
  {
    description:
      'The app\'s UI as text: what it shows, in order, with a number on each element that can be pressed, typed in or scrolled, as `[3] press "♡ 0"` or `[4] input "" placeholder "Add a comment"`. Inspect again after acting, since the numbers follow what\'s drawn.',
    inputSchema: { device },
  },
  ({ device }) => act({ kind: "inspect" }, device),
);

server.registerTool(
  "press",
  {
    description:
      "Presses an element, as a tap would: its `onPress`. Answers what it pressed, named as `inspect` names it, so a stale number shows.",
    inputSchema: { target, device },
  },
  ({ target, device }) => act({ kind: "press", target }, device),
);

server.registerTool(
  "type",
  {
    description:
      "Types into an input, replacing what it holds: its `onChangeText`. Press the button that sends it afterwards, as a person would.",
    inputSchema: { target, text: z.string(), device },
  },
  ({ target, text, device }) => act({ kind: "type", target, text }, device),
);

server.registerTool(
  "scroll",
  {
    description:
      "Scrolls a list by most of what it shows, as a swipe would, so a list that loads more as it nears its end does.",
    inputSchema: {
      target,
      direction: z.enum(["down", "up"]).default("down"),
      device,
    },
  },
  ({ target, direction, device }) =>
    act({ kind: "scroll", target, direction }, device),
);

await server.connect(new StdioServerTransport());
