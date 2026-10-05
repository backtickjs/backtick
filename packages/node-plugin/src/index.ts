import { registerHooks } from "node:module";
import { load, resolve } from "./hooks.js";

/**
 * Use it from the command line, as Node's `--import`:
 *
 * ```sh
 * node --import @backtickjs/node-plugin ./server/index.tsx
 * ```
 *
 * TypeScript and JSX files outside `node_modules` are compiled as they load,
 * their `cs` scripts with them. The framework's compile steps are the
 * project's, named in its `package.json`:
 *
 * ```json
 * "backtick": { "plugins": ["@backtickjs/react/plugin"] }
 * ```
 */
//
// The hooks run on this thread, synchronously, so they answer `require` as well
// as `import`: an app's package.json has no `"type": "module"`, so Node starts
// a server file as CommonJS before it sees the `import`s.
registerHooks({ resolve, load });
