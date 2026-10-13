import { createBuilds } from "@backtickjs/builds";
import { fileURLToPath } from "node:url";

// The app's builds, registered in builds/, which screens are bundled for.
export const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});
