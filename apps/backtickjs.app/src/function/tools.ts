// The MCP tools a host's model calls, for the signed-in user it calls for.
import { randomUUID } from "node:crypto";
import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import { waitUntil } from "@vercel/functions";
import * as z from "zod";
import { snapshotId, typecheckInSandbox } from "./sandbox.ts";
import { starter } from "./starter.ts";
import {
  type Check,
  latestVersion,
  recordCheck,
  saveVersion,
} from "./store.ts";

export function tools(owner: string): McpServer {
  // What a host sees before it loads the tools, so it's what decides whether
  // they're used at all.
  const server = new McpServer(
    {
      name: "backtick",
      title: "Backtick",
      version: "0.0.0",
    },
    {
      instructions:
        "Backtick makes native apps that run on the user's phone, in the " +
        "Backtick app. start_app gives a starter to edit, and save_app " +
        "checks the code and saves it as a version the phone opens. These " +
        "are the tools for an app the user wants on their phone: a web page " +
        "or an artifact doesn't reach it.",
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
        typecheckInSandbox(owner, starter, snapshotId()).catch((error) =>
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
      const latest = await latestVersion(id, owner);
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
      const started = performance.now();
      const { errors, warnings } = await typecheckInSandbox(
        owner,
        code,
        snapshotId(),
      );
      const durationMs = Math.round(performance.now() - started);
      if (errors.length > 0) {
        recorded({
          appId: id,
          owner,
          source: code,
          errors,
          warnings,
          durationMs,
        });
        return failed([...errors, ...warnings].join("\n"));
      }
      const version = await saveVersion(id, owner, title, code);
      if (version === undefined) {
        return failed(`App ${id} isn't yours: start your own with start_app.`);
      }
      recorded({ appId: id, owner, version, errors, warnings, durationMs });
      return text([JSON.stringify({ id, version }), ...warnings].join("\n\n"));
    },
  );

  return server;
}

// Kept after the answer, and never failing it: a check that isn't recorded
// is only logged.
function recorded(check: Check): void {
  waitUntil(
    recordCheck(check).catch((error) =>
      console.error("Recording a check failed:", error),
    ),
  );
}

function text(content: string): CallToolResult {
  return { content: [{ type: "text", text: content }] };
}

// An error the model reads and acts on, as the tool's result.
function failed(content: string): CallToolResult {
  return { ...text(content), isError: true };
}
