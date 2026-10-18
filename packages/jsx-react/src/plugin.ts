import ts from "typescript";

/**
 * React's JSX transform as a build's compile step: a script's module, its JSX
 * as calls of `react/jsx-runtime`'s `jsx`, written by TypeScript's own
 * `react-jsx` emit. Typed by its shape, which is the compiler's `Plugin`, so
 * this package needn't depend on the compiler.
 */
export function react(): (
  code: string,
  id: string,
) => { code: string; map: string } {
  return (code, id) => {
    const { outputText, sourceMapText } = ts.transpileModule(code, {
      fileName: id,
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
        sourceMap: true,
      },
    });
    return {
      code: outputText.replace(/\n\/\/# sourceMappingURL=.*$/, ""),
      map: sourceMapText!,
    };
  };
}

// What a project names to compile its scripts for React, in its `package.json`:
// `"backtick": { "plugins": ["@backtickjs/jsx-react/plugin"] }`.
export default react;
