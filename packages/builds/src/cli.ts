#!/usr/bin/env node
import { relative } from "node:path";
import { createBuilds, register } from "./builds.js";
import { type Platform, platforms } from "./moduleMap.js";

// `backtick-builds register`: records the builds the app in this directory
// now makes, to commit. `backtick-builds check`: fails unless they're all
// registered, as an EAS build's `eas-build-post-install` runs it, checking
// the platform it builds and letting a development build through.
const [command] = process.argv.slice(2);
const projectRoot = process.cwd();

if (command === "register") {
  for (const { platform, file } of register(projectRoot)) {
    console.log(`Registered ${platform}: ${relative(projectRoot, file)}`);
  }
} else if (command === "check") {
  if (process.env.EAS_BUILD_PROFILE === "development") {
    console.log("A development build: its server is this code's.");
    process.exit(0);
  }
  const building = process.env.EAS_BUILD_PLATFORM as Platform | undefined;
  const builds = createBuilds({ projectRoot });
  const problems = (building ? [building] : platforms)
    .map((platform) => builds.unregistered(platform))
    .filter((problem) => problem !== null);
  for (const problem of problems) console.error(problem);
  if (problems.length > 0) process.exit(1);
  console.log("Every build this code makes is registered.");
} else {
  console.error("Usage: backtick-builds register | check");
  process.exit(1);
}
