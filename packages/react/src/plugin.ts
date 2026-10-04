import { transformSync } from "@babel/core";
import preset from "@babel/preset-react";

/**
 * React's JSX transform as a build's compile step: a script's module, its JSX
 * as calls of `react/jsx-runtime`'s `jsx`. Typed by its shape, which is the
 * compiler's `Plugin`, so the adapter needn't depend on the compiler.
 */
export function react(): (
  code: string,
  id: string,
) => { code: string; map: string } {
  return (code, id) => {
    const result = transformSync(code, {
      filename: id,
      babelrc: false,
      configFile: false,
      sourceMaps: true,
      presets: [[preset, { runtime: "automatic" }]],
    })!;
    return { code: result.code!, map: JSON.stringify(result.map) };
  };
}

// What a project names to compile its scripts for React, in its `package.json`:
// `"backtick": { "plugins": ["@backtickjs/react/plugin"] }`.
export default react;
