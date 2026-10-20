// The MCP tools a host's model calls. Apps are kept in memory and every call
// is one local user, until Supabase stores apps and signs users in.
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import { waitUntil } from "@vercel/functions";
import * as z from "zod";
import { typecheckInSandbox } from "./sandbox.ts";

const user = "local";
const starter = readFileSync(
  new URL("../../starter/App.tsx", import.meta.url),
  "utf8",
);
// Each app's versions, oldest first: version n is `versions[n - 1]`.
const apps = new Map<string, { title: string; versions: string[] }>();

export function tools(): McpServer {
  const server = new McpServer({ name: "backtick", version: "0.0.0" });

  server.registerTool(
    "create_app",
    {
      description:
        "Start an app for the user's phone. Returns its id and a starter " +
        "App.tsx, a working app to edit into what the user asked for.",
      inputSchema: z.object({ title: z.string() }),
    },
    async ({ title }) => {
      const id = randomUUID();
      apps.set(id, { title, versions: [] });
      // The sandbox is made and warmed while the model writes its code, so
      // the first `update_app` finds it ready.
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
      description: "The app's latest App.tsx, to edit it.",
      inputSchema: z.object({ id: z.string() }),
    },
    async ({ id }) => {
      const app = apps.get(id);
      if (app === undefined) {
        return failed(`No app ${id}.`);
      }
      const latest = app.versions.at(-1) ?? starter;
      return text(
        `${JSON.stringify({ id, version: app.versions.length })}\n\n` +
          `\`\`\`tsx\n${latest}\`\`\``,
      );
    },
  );

  server.registerTool(
    "update_app",
    {
      description:
        "Check the app's whole App.tsx and, if it has no errors, save it as " +
        "the app's next version. Returns the errors to fix, or the version.",
      inputSchema: z.object({ id: z.string(), code: z.string() }),
    },
    async ({ id, code }) => {
      const app = apps.get(id);
      if (app === undefined) {
        return failed(`No app ${id}. Call create_app first.`);
      }
      const errors = await typecheckInSandbox(user, code, snapshotId());
      if (errors.length > 0) {
        return failed(errors.join("\n"));
      }
      app.versions.push(code);
      return text(JSON.stringify({ id, version: app.versions.length }));
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
