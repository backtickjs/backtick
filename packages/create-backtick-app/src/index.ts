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
import { createInterface } from "node:readline/promises";
import { parseArgs } from "node:util";

// `create-expo-app`, for an app whose screens come from your server: the same
// question, the same install, the same next steps, and a Backtick server
// beside the app.
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    yes: { type: "boolean", short: "y" },
    "no-install": { type: "boolean" },
  },
});

const name = positionals[0] ?? (values.yes ? "my-app" : await askName());
const target = path.resolve(name);
const slug = path.basename(target);

if (existsSync(target) && readdirSync(target).length > 0) {
  console.error(
    `The directory ${slug} has files that might be overwritten. Try using a new directory name.`,
  );
  process.exit(1);
}

// The template beside this file once built: `dist/../template`.
const template = new URL("../template/", import.meta.url);
cpSync(template, target, {
  recursive: true,
  // What running the template inside the Backtick repository leaves behind.
  filter: (source) => !/[\\/](node_modules|\.expo)([\\/]|$)/.test(source),
});
// npm drops a `.gitignore` from a published package, so it ships unnamed.
renameSync(path.join(target, "gitignore"), path.join(target, ".gitignore"));
rewriteJson(path.join(target, "package.json"), (json) => {
  json.name = slug;
});
rewriteJson(path.join(target, "app.json"), (json) => {
  json.expo.name = slug;
  json.expo.slug = slug;
});
console.log("✔ Created project files.");

// The package manager this was run with, as `npm create` and its peers say.
const manager = (process.env.npm_config_user_agent ?? "npm").split("/")[0];
const run = ["npm", "pnpm", "yarn", "bun"].includes(manager) ? manager : "npm";

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
- ${run} run android
- ${run} run ios
- ${run} run web

Each starts your Backtick server alongside Expo. Edit server/Home.tsx and save to see the screen change.
`);

async function askName(): Promise<string> {
  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await prompt.question("? What is your app named? › (my-app) ");
  prompt.close();
  return answer.trim() || "my-app";
}

function rewriteJson(file: string, change: (json: any) => void): void {
  const json = JSON.parse(readFileSync(file, "utf8"));
  change(json);
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
}
