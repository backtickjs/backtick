// The MCP tools a host's model calls. Every call is one local user, until
// Supabase signs users in.
import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import { waitUntil } from "@vercel/functions";
import * as z from "zod";
import { typecheckInSandbox } from "./sandbox.ts";
import { starter } from "./starter.ts";
import { createApp, latestVersion, saveVersion } from "./store.ts";

const user = "local";

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
      const id = await createApp(title);
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
      inputSchema: z.object({ id: z.uuid() }),
    },
    async ({ id }) => {
      const latest = await latestVersion(id);
      if (latest === undefined) {
        return failed(`No app ${id}.`);
      }
      return text(
        `${JSON.stringify({ id, version: latest.version })}\n\n` +
          `\`\`\`tsx\n${latest.source ?? starter}\`\`\``,
      );
    },
  );

  server.registerTool(
    "update_app",
    {
      description:
        "Check the app's whole App.tsx and, if it has no errors, save it as " +
        "the app's next version. Returns the errors to fix, or the version.",
      inputSchema: z.object({ id: z.uuid(), code: z.string() }),
    },
    async ({ id, code }) => {
      const latest = await latestVersion(id);
      if (latest === undefined) {
        return failed(`No app ${id}. Call create_app first.`);
      }
      const errors = await typecheckInSandbox(user, code, snapshotId());
      if (errors.length > 0) {
        return failed(errors.join("\n"));
      }
      const version = await saveVersion(id, latest.version, code);
      return text(JSON.stringify({ id, version }));
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
