// The MCP tools a host's model calls, for the signed-in user it calls for.
import { randomUUID } from "node:crypto";
import {
  RESOURCE_MIME_TYPE,
  registerAppResource,
  registerAppTool,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import { waitUntil } from "@vercel/functions";
import * as z from "zod";
import { applyEdits } from "./applyEdits.ts";
import { card, cardHtml, cardScriptOrigin, cardUri } from "./card.ts";
import { diagnose } from "./diagnostics/index.ts";
import { phoneModules, phoneVersions, serverModules } from "./modules.ts";
import { checkInSandbox, snapshotId, typecheckInSandbox } from "./sandbox.ts";
import { starter } from "./starter.ts";
import {
  type Check,
  latestVersion,
  listApps,
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
      description: "Build native apps with AI, all from your phone.",
      websiteUrl: "https://backtickjs.com",
      version: "0.0.0",
    },
    {
      instructions: "Backtick builds native apps that run on the user's phone.",
    },
  );

  // Saves nothing: the app exists from its first save. So it's read-only, and
  // a host may run it without asking.
  server.registerTool(
    "new_app",
    {
      title: "New app",
      description:
        "A new app's id and starter code, with nothing saved yet. " +
        "Save the first version with save_app, then change it with " +
        "update_app.",
      inputSchema: z.object({}),
      annotations: {
        title: "New app",
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
    },
    async () => {
      const id = randomUUID();
      warmSandbox();
      return text(
        `${JSON.stringify({ id })}\n\n` +
          `\`\`\`tsx\n${starter}\`\`\`\n\n` +
          `The phone provides these client modules, and only these, each at exactly this version: ` +
          `${phoneModules.map((specifier) => `${specifier}@${phoneVersions[specifier]}`).join(", ")}. ` +
          `The app is checked against these versions, and the phone runs them. ` +
          `The server has these packages, and only these: ${serverModules.join(", ")}.`,
      );
    },
  );

  server.registerTool(
    "get_app",
    {
      title: "Get an app",
      description: "An app's latest code and version, to change it.",
      inputSchema: z.object({ id: z.uuid() }),
      annotations: {
        title: "Get an app",
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
    },
    async ({ id }) => {
      const latest = await latestVersion(id, owner);
      if (latest === undefined) {
        return failed(`No saved app ${id}.`);
      }
      warmSandbox();
      return text(
        `${JSON.stringify({ id, version: latest.version })}\n\n` +
          `\`\`\`tsx\n${latest.source}\`\`\``,
      );
    },
  );

  server.registerTool(
    "list_apps",
    {
      title: "List apps",
      description:
        "The user's apps, last saved first, with their ids and titles.",
      inputSchema: z.object({}),
      annotations: {
        title: "List apps",
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
    },
    async () => text(JSON.stringify(await listApps(owner))),
  );

  // The card the host shows with each save.
  registerAppResource(
    server,
    "App card",
    cardUri,
    { description: "An app's title, version, and a button to open it." },
    async () => ({
      contents: [
        {
          uri: cardUri,
          mimeType: RESOURCE_MIME_TYPE,
          text: cardHtml,
          _meta: { ui: { csp: { resourceDomains: [cardScriptOrigin] } } },
        },
      ],
    }),
  );

  registerAppTool(
    server,
    "save_app",
    {
      title: "Save an app",
      description:
        "Typechecks and compiles an app's complete code; if it passes, " +
        "saves it as the app's latest version and returns its link, which " +
        "opens it in Backtick on the user's phone. If not, nothing is " +
        "saved.",
      inputSchema: z.object({
        id: z.uuid(),
        title: z.string(),
        code: z.string(),
      }),
      annotations: {
        title: "Save an app",
        readOnlyHint: false,
        destructiveHint: false,
        openWorldHint: false,
      },
      _meta: { ui: { resourceUri: cardUri } },
    },
    async ({ id, title, code }) => save(id, title, code),
  );

  // Artifact-shaped, as Claude's Artifact tool's `edits`: exact replacements,
  // so a small change to a big app isn't the whole file again. A list because
  // each call is a check, a version and a card.
  registerAppTool(
    server,
    "update_app",
    {
      title: "Update an app",
      description:
        "Edits an app's last saved code and saves it as save_app does; " +
        "each old_str must match exactly once. Put every edit for a change " +
        "in one call: a failed call saves nothing.",
      inputSchema: z.object({
        id: z.uuid(),
        edits: z
          .array(z.object({ old_str: z.string(), new_str: z.string() }))
          .min(1),
      }),
      annotations: {
        title: "Update an app",
        readOnlyHint: false,
        destructiveHint: false,
        openWorldHint: false,
      },
      _meta: { ui: { resourceUri: cardUri } },
    },
    async ({ id, edits }) => {
      const latest = await latestVersion(id, owner);
      if (latest === undefined) {
        return failed(
          `App ${id} has no saved version to edit: save it with save_app.`,
        );
      }
      const edited = applyEdits(latest.source, edits);
      if ("error" in edited) {
        return failed(`Version ${latest.version}: ${edited.error}`);
      }
      return save(id, latest.title, edited.code);
    },
  );

  // A save is coming: the sandbox is made and warmed while the model writes
  // the code, so the save finds it ready.
  function warmSandbox(): void {
    waitUntil(
      typecheckInSandbox(owner, starter, snapshotId()).catch((error) =>
        console.error("Warming the sandbox failed:", error),
      ),
    );
  }

  async function save(
    id: string,
    title: string,
    code: string,
  ): Promise<CallToolResult> {
    const started = performance.now();
    // What save_app's own rules refuse (diagnostics/), before the sandbox
    // checks the rest. TypeScript loads here, not as the function starts.
    const { default: ts } = await import("typescript");
    const unprovided = diagnose(
      ts,
      ts.createSourceFile("App.tsx", code, ts.ScriptTarget.Latest, true),
    );
    // A check that fails (a sandbox that didn't answer, even asked again) is
    // a failed save like any other: recorded with its source, to reproduce,
    // and told to the model, to try again.
    const checked =
      unprovided.length > 0
        ? { errors: unprovided, warnings: [] }
        : await checkInSandbox(owner, code, snapshotId()).catch(
            (error: Error) => ({
              errors: [
                `The check didn't finish (${error.message}). Try again.`,
              ],
              warnings: [],
            }),
          );
    const { errors, warnings, compiled, packages } = checked;
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
      return failed(
        [
          "Nothing was saved. Fix these errors and try again.",
          ...errors,
          ...warnings,
        ].join("\n"),
      );
    }
    const version = await saveVersion(
      id,
      owner,
      title,
      code,
      compiled!,
      packages!,
    );
    if (version === "not yours") {
      return failed(`App ${id} isn't yours: make your own with new_app.`);
    }
    if (version === "deleted") {
      return failed(
        `App ${id} was deleted from the user's phone: make a new one with new_app.`,
      );
    }
    recorded({ appId: id, owner, version, errors, warnings, durationMs });
    const url = `https://${id}.backtickjs.app`;
    return {
      ...text([JSON.stringify({ id, version, url }), ...warnings].join("\n\n")),
      // For the card only: the model reads the text above.
      _meta: { "backtickjs.com/card": await card(id, title, version, url) },
    };
  }

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
