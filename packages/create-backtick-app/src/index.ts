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
import { parseArgs } from "node:util";
import prompts from "prompts";

// `create-expo-app`, for an app whose screens come from your server: the same
// questions, the same install, the same next steps, with the framework yours
// to pick and a Backtick server beside it.

interface Template {
  title: string;
  description: string;
  // What to run once installed, after `cd`, as `<manager> run <script>`.
  scripts: string[];
  // What to say after the scripts.
  then: string;
}

const TEMPLATES: Record<string, Template> = {
  "react-native": {
    title: "React Native",
    description: "An Expo app, its screens from your server",
    scripts: ["android", "ios", "web"],
    then: "Each starts your Backtick server alongside Expo. Edit server/Home.tsx and save to see the screen change.",
  },
  react: {
    title: "React",
    description: "A web page, rendered by React",
    scripts: ["start"],
    then: "Then open http://localhost:3000. Edit server/Home.tsx and save to see the page change.",
  },
  "solid-js": {
    title: "solid-js",
    description: "A web page, rendered by Solid",
    scripts: ["start"],
    then: "Then open http://localhost:3000. Edit server/Home.tsx and save to see the page change.",
  },
};

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    template: { type: "string", short: "t" },
    runtime: { type: "string", short: "r" },
    yes: { type: "boolean", short: "y" },
    "no-install": { type: "boolean" },
  },
});

if (values.template !== undefined && !(values.template in TEMPLATES)) {
  console.error(
    `There's no template named ${values.template}. Pick one of: ${Object.keys(TEMPLATES).join(", ")}.`,
  );
  process.exit(1);
}

// What runs your Backtick server, and the loader that compiles it for that
// runtime.
const RUNTIMES: Record<string, { title: string; loader: string }> = {
  node: { title: "Node", loader: "@backtickjs/node-plugin" },
  bun: { title: "Bun", loader: "@backtickjs/bun-plugin" },
};

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

// Asked only what the command line didn't say, as `create-expo-app` asks.
const answers = await prompts(
  [
    {
      type: positionals[0] !== undefined || values.yes ? null : "text",
      name: "name",
      message: "What is your app named?",
      initial: "my-app",
    },
    {
      type: values.template !== undefined || values.yes ? null : "select",
      name: "template",
      message: "Which framework?",
      choices: Object.entries(TEMPLATES).map(([value, template]) => ({
        title: template.title,
        description: template.description,
        value,
      })),
    },
    {
      type: values.runtime !== undefined || values.yes ? null : "select",
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
cpSync(new URL(`../templates/${templateName}/`, import.meta.url), target, {
  recursive: true,
  // What running a template inside the Backtick repository leaves behind.
  filter: (source) => !/[\\/](node_modules|\.expo)([\\/]|$)/.test(source),
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

console.log(`
✅ Your project is ready!

To run your project, navigate to the directory and run one of the following ${run} commands.

- cd ${slug}
${template.scripts.map((script) => `- ${run} run ${script}`).join("\n")}

${template.then}
`);

function rewriteJson(file: string, change: (json: any) => void): void {
  const json = JSON.parse(readFileSync(file, "utf8"));
  change(json);
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
}
