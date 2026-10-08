#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import prompts from "prompts";
import { isSupportedNode } from "./nodeVersion.js";

// Creates an app whose screens come from your server: a few questions, the
// install, then the next steps, with the framework yours to pick and a
// Backtick server beside it.

interface Template {
  title: string;
  description: string;
  // What to do once installed: `start` is the commands that start the project,
  // a `cd` first where it was created elsewhere, and `run` how to run a script.
  next(start: string, run: (script: string) => string): string;
}

// The web templates' next steps.
const webNext = (start: string) => `To run your project:

${start}

Then open http://localhost:3000. Edit server/Home.tsx and save to see the page change.`;

const TEMPLATES: Record<string, Template> = {
  "react-native": {
    title: "React Native",
    description: "An Expo app, its screens from your server",
    next: (start, run) => `To open it on your phone:

1. Install Expo Go on your phone, from the App Store or Google Play.
2. Connect your phone to the same Wi-Fi network as this computer.
3. Start your project, which starts your Backtick server alongside Expo:

${start}

4. Scan the QR code it shows: with the Camera app on iPhone, or with Expo Go on Android.

Then edit server/Home.tsx and save to see the screen change on your phone.

No phone at hand? ${run("ios")}, ${run("android")} or ${run("web")} opens it in the iOS Simulator, an Android emulator or a browser instead.`,
  },
  react: {
    title: "React",
    description: "A web page, rendered by React",
    next: webNext,
  },
  "solid-js": {
    title: "solid-js",
    description: "A web page, rendered by Solid",
    next: webNext,
  },
};

// What runs your Backtick server, and the loader that compiles it for that
// runtime.
const RUNTIMES: Record<string, { title: string; loader: string }> = {
  node: { title: "Node", loader: "@backtickjs/node-plugin" },
  bun: { title: "Bun", loader: "@backtickjs/bun-plugin" },
};

const USAGE = `Usage: create-backtick-app [name] [options]

Options:
  -t, --template <name>  The framework: ${Object.keys(TEMPLATES).join(", ")}
  -r, --runtime <name>   The server's runtime: ${Object.keys(RUNTIMES).join(", ")}
  -y, --yes              Use the defaults for anything not given
  --no-install           Skip installing packages
  -h, --help             Show this help

Asks for what isn't given, in a terminal; elsewhere, uses the defaults:
my-app, react-native, and node (bun when run with bun).`;

let parsed;
try {
  parsed = parseArgs({
    allowPositionals: true,
    options: {
      template: { type: "string", short: "t" },
      runtime: { type: "string", short: "r" },
      yes: { type: "boolean", short: "y" },
      "no-install": { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  });
} catch (error) {
  // Node's first sentence, as "Unknown option '--framework'.", without its
  // advice on positional arguments.
  const [problem] = (error as Error).message.split(". ");
  console.error(`${problem!.replace(/\.?$/, ".")}\n\n${USAGE}`);
  process.exit(1);
}
const { values, positionals } = parsed;

if (values.help) {
  console.log(USAGE);
  process.exit(0);
}

// Said, not refused: what fails on another version is the app's toolchain,
// later, and only some of it.
if (!isSupportedNode(process.versions.node)) {
  console.warn(
    `Backtick and React Native support Node 22 (22.15 or later) and 24 (24.3 or ` +
      `later), and you're on Node ${process.versions.node}. If something fails, ` +
      `switch to Node 22 or 24.\n`,
  );
}

if (values.template !== undefined && !(values.template in TEMPLATES)) {
  console.error(
    `There's no template named ${values.template}. Pick one of: ${Object.keys(TEMPLATES).join(", ")}.`,
  );
  process.exit(1);
}

if (values.runtime !== undefined && !(values.runtime in RUNTIMES)) {
  console.error(
    `There's no runtime named ${values.runtime}. Pick one of: ${Object.keys(RUNTIMES).join(", ")}.`,
  );
  process.exit(1);
}

// The package manager this was run with, as `npm create` and its peers say,
// which is also the runtime to suggest: `bun create` suggests Bun.
const manager = (process.env.npm_config_user_agent ?? "npm").split("/")[0];
const run = ["npm", "pnpm", "yarn", "bun"].includes(manager) ? manager : "npm";
const suggestedRuntime = run === "bun" ? "bun" : "node";

// Asked only what the command line didn't say, and only in a terminal: an
// agent or a CI script can't answer, so it gets the defaults, as `--yes` does.
const ask = process.stdin.isTTY === true && !values.yes;
const answers = await prompts(
  [
    {
      type: positionals[0] !== undefined || !ask ? null : "text",
      name: "name",
      message: "What is your app named?",
      initial: "my-app",
    },
    {
      type: values.template !== undefined || !ask ? null : "select",
      name: "template",
      message: "Which framework?",
      choices: Object.entries(TEMPLATES).map(([value, template]) => ({
        title: template.title,
        description: template.description,
        value,
      })),
    },
    {
      type: values.runtime !== undefined || !ask ? null : "select",
      name: "runtime",
      message: "Which runtime?",
      choices: Object.entries(RUNTIMES).map(([value, runtime]) => ({
        title: runtime.title,
        value,
      })),
      initial: Object.keys(RUNTIMES).indexOf(suggestedRuntime),
    },
  ],
  { onCancel: () => process.exit(1) },
);

const name: string = positionals[0] ?? answers.name ?? "my-app";
const templateName: string =
  values.template ?? answers.template ?? "react-native";
const template = TEMPLATES[templateName]!;
const runtimeName: string =
  values.runtime ?? answers.runtime ?? suggestedRuntime;

const target = path.resolve(name);
const slug = path.basename(target);

if (existsSync(target) && readdirSync(target).length > 0) {
  console.error(
    `The directory ${slug} has files that might be overwritten. Try using a new directory name.`,
  );
  process.exit(1);
}

// The templates beside this file once built: `dist/../templates`.
const templateFolder = fileURLToPath(
  new URL(`../templates/${templateName}/`, import.meta.url),
);
cpSync(templateFolder, target, {
  recursive: true,
  // What running a template inside the Backtick repository leaves behind,
  // matched within the template: the CLI itself runs from a `node_modules`
  // when installed, and a path from the root would match every file.
  filter: (source) =>
    !/(^|[\\/])(node_modules|\.expo|\.turbo)([\\/]|$)/.test(
      path.relative(templateFolder, source),
    ),
});
// npm drops a `.gitignore` from a published package, so it ships unnamed.
renameSync(path.join(target, "gitignore"), path.join(target, ".gitignore"));
rewriteJson(path.join(target, "package.json"), (json) => {
  json.name = slug;
  // The templates ship Node's loader; another runtime gets its own, which is
  // how `scripts/start.mjs` knows what to run.
  const loader = RUNTIMES[runtimeName]!.loader;
  if (!(loader in json.dependencies)) {
    const version = json.dependencies["@backtickjs/node-plugin"];
    delete json.dependencies["@backtickjs/node-plugin"];
    json.dependencies = Object.fromEntries(
      Object.entries({ ...json.dependencies, [loader]: version }).sort(),
    );
  }
});
if (existsSync(path.join(target, "app.json"))) {
  rewriteJson(path.join(target, "app.json"), (json) => {
    json.expo.name = slug;
    json.expo.slug = slug;
  });
}
console.log("✔ Created project files.");

if (!values["no-install"]) {
  console.log(`> ${run} install`);
  const { status } = spawnSync(run, ["install"], {
    cwd: target,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (status !== 0) {
    console.error(`${run} install failed. Run it again in ${slug}.`);
    process.exit(status ?? 1);
  }
}

// Created where it was run, there's nowhere to go first.
const here = target === process.cwd();
const script = (name: string) => `${run} run ${name}`;
const start = [...(here ? [] : [`cd ${slug}`]), script("start")]
  .map((command) => `   ${command}`)
  .join("\n");
console.log(`
✅ Your project is ready!

${template.next(start, script)}
`);

function rewriteJson(file: string, change: (json: any) => void): void {
  const json = JSON.parse(readFileSync(file, "utf8"));
  change(json);
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
}
