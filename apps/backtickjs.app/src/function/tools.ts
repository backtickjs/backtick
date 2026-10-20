// The MCP tools a host's model calls. Every call is one local user, until
// Supabase signs users in.
import { randomUUID } from "node:crypto";
import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import { waitUntil } from "@vercel/functions";
import * as z from "zod";
import { typecheckInSandbox } from "./sandbox.ts";
import { starter } from "./starter.ts";
import { latestVersion, saveVersion } from "./store.ts";

const user = "local";

export function tools(): McpServer {
  // What a host sees before it loads the tools, so it's what decides whether
  // they're used at all.
  const server = new McpServer(
    { name: "backtick", title: "Backtick", version: "0.0.0" },
    {
      instructions:
        "Backtick makes native apps that run on the user's phone, in the " +
        "Backtick app. When the user asks for an app, a tool or a game for " +
        "their phone, or to open something on their phone, use start_app " +
        "and then save_app instead of making a web page or an artifact.",
    },
  );

  // Saves nothing: the app exists from its first save. So it's read-only, and
  // a host may run it without asking.
  server.registerTool(
    "start_app",
    {
      title: "Start an app",
      description:
        "Use when the user wants an app on their phone: a native app they " +
        "open in the Backtick app, not a web page or an artifact. Returns a " +
        "new app's id and a starter App.tsx, a working app to edit into what " +
        "they asked for, then save with save_app. Saves nothing itself.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () => {
      const id = randomUUID();
      // The sandbox is made and warmed while the model writes its code, so
      // the first `save_app` finds it ready.
      waitUntil(
        typecheckInSandbox(user, starter, snapshotId()).catch((error) =>
          console.error("Warming the sandbox failed:", error),
        ),
      );
      return text(
        `${JSON.stringify({ id, file: "App.tsx" })}\n\n` +
          `\`\`\`tsx\n${starter}\`\`\``,
      );
    },
  );

  server.registerTool(
    "get_app",
    {
      title: "Get an app",
      description:
        "An app's latest saved App.tsx and its version, to change it.",
      inputSchema: z.object({ id: z.uuid() }),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ id }) => {
      const latest = await latestVersion(id);
      if (latest === undefined) {
        return failed(`No saved app ${id}.`);
      }
      return text(
        `${JSON.stringify({ id, version: latest.version })}\n\n` +
          `\`\`\`tsx\n${latest.source}\`\`\``,
      );
    },
  );

  server.registerTool(
    "save_app",
    {
      title: "Save an app",
      description:
        "Type-check the app's whole App.tsx and, if it has no errors, save " +
        "it as the app's next version, the one the user's phone opens. The " +
        "first save creates the app with its title. Returns the errors to " +
        "fix, or the version with any warnings.",
      inputSchema: z.object({
        id: z.uuid(),
        title: z.string(),
        code: z.string(),
      }),
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        openWorldHint: false,
      },
    },
    async ({ id, title, code }) => {
      const { errors, warnings } = await typecheckInSandbox(
        user,
        code,
        snapshotId(),
      );
      if (errors.length > 0) {
        return failed([...errors, ...warnings].join("\n"));
      }
      const version = await saveVersion(id, title, code);
      return text([JSON.stringify({ id, version }), ...warnings].join("\n\n"));
    },
  );

  return server;
}

function snapshotId(): string {
  const id = process.env.SNAPSHOT_ID;
  if (id === undefined) {
    throw new Error("Set SNAPSHOT_ID to the id scripts/snapshot.ts printed.");
  }
  return id;
}

function text(content: string): CallToolResult {
  return { content: [{ type: "text", text: content }] };
}

// An error the model reads and acts on, as the tool's result.
function failed(content: string): CallToolResult {
  return { ...text(content), isError: true };
}
