import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";
import { renderToString } from "@backtickjs/web-page/server";
import { casesOf, groupNames } from "./groups.js";
import { Report } from "./Report.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;
const clientUrl = `/client-${client.hash}.js`;

async function toHtml(element: BacktickElement): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Backtick conformance</title>
  </head>
  <body style="margin: 32px; font: 14px/1.5 ui-monospace, monospace; white-space: pre-wrap">
    ${await renderToString(element, clientUrl)}
  </body>
</html>`;
}

// A group is bundled once, the first time a client asks for it.
const bundles = new Map<string, Promise<string>>();

function bundleOf(group: string): Promise<string> | null {
  if (!groupNames.includes(group)) return null;
  if (!bundles.has(group)) {
    // A bundle each, so a case a client can't build fails alone.
    bundles.set(
      group,
      casesOf(group).then(async (cases) =>
        JSON.stringify(
          await Promise.all(
            cases!.map(async ({ name, script }) => ({
              name,
              bundle: await bundler.run(script),
            })),
          ),
        ),
      ),
    );
  }
  return bundles.get(group)!;
}

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async (request) => {
      // `?group=` runs only the groups under it, and lists what did not pass.
      const url = new URL(request.url);
      const group = url.searchParams.get("group");
      const groups = groupNames.filter((name) => name.startsWith(group ?? ""));
      // An element saying what to draw. The component has not run yet.
      const report = (
        <Report groups={groups} base={url.origin} detailed={group !== null} />
      );

      // A document carrying what it drew, with the client that draws it.
      const html = await toHtml(report);

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },

    // One group's cases, each as a bundle whose root is its verdict.
    "/group/*": async (request) => {
      const group = decodeURIComponent(
        new URL(request.url).pathname.slice("/group/".length),
      );
      const bundle = bundleOf(group);
      return bundle === null
        ? new Response("no such group", { status: 404 })
        : new Response(await bundle, {
            headers: { "content-type": "application/json" },
          });
    },

    // The hash changes with the client, so the browser can keep this forever.
    [clientUrl]: () =>
      new Response(client, {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      }),
  },
});

console.log(`Preview on ${server.url}`);
