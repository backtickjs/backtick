import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/platform-sdk";
import { createRoot } from "solid-js";
import { createRenderer } from "solid-js/universal";
import { builtinOf } from "./builtinOf.js";
import type { InterpreterOptions } from "./createInterpreter.js";
import { callComponent, drawElement, drawList, memo } from "./draw.js";
import type { DrawnProp } from "./draw.js";
import type { Instance } from "./Instance.js";
import { rendererOptions } from "./rendererOptions.js";

/** A printed bundle's default export. */
export type Program = (data: readonly ClientValue[]) => ClientValue;

/** A printed bundle as the client runs it: see `printBundle`. */
export interface PrintedModule {
  readonly program: Program;
  readonly data: readonly ClientValue[];
  readonly globals: readonly string[];
}

/** What the runtime does with a printed bundle: `Interpreter`'s two, for one. */
export interface PrintedRuntime<NodeType extends object> {
  render(
    module: PrintedModule,
    parent: NodeType,
    anchor?: NodeType,
  ): () => void;
  evaluate<T extends ClientUnknown>(module: PrintedModule): T;
}

type Globals = { [name: string]: unknown };

// The builtins a runtime put on `globalThis`, which the next runtime to run a
// module asks for again: two targets may answer the same name differently.
const installed = new Set<string>();

/**
 * The runtime printed bundles run on, wired to a window as the interpreter is.
 *
 * What a module reads as a global is put on `globalThis` before it runs: the
 * runtime's own functions, and every builtin it names that the global object
 * does not already hold.
 */
export function createRuntime(
  options: InterpreterOptions,
): PrintedRuntime<Node> {
  const renderer = createRenderer(rendererOptions(options.window.document));
  // What `builtinOf` reads. `evaluate` still interprets the bundle it is
  // handed, so it gets a bundle of its own there.
  const instance: Instance = {
    ...options,
    renderer,
    bundle: { functions: {}, root: null } as unknown as Bundle<ClientUnknown>,
    functions: new Map(),
  };
  const own = {
    element: (
      id: string,
      props: readonly DrawnProp[],
      children: (() => unknown) | null,
    ) => drawElement(renderer, id, props, children),
    list: drawList,
    component: callComponent,
    memo,
  };
  const install = (names: readonly string[]): void => {
    const scope = globalThis as unknown as Globals;
    Object.assign(scope, own);
    for (const name of names) {
      if (installed.has(name)) {
        delete scope[name];
        installed.delete(name);
      }
      if (name in scope) {
        continue;
      }
      const value = builtinOf(instance, name);
      if (value === undefined) {
        throw new Error(`unknown builtin ${name}`);
      }
      scope[name] = value;
      installed.add(name);
    }
  };
  return {
    render: ({ program, data, globals }, parent, anchor) =>
      createRoot((dispose) => {
        install(globals);
        renderer.insert(parent, program(data), anchor);
        return dispose;
      }),
    evaluate: <T extends ClientUnknown>({
      program,
      data,
      globals,
    }: PrintedModule) =>
      createRoot(() => {
        install(globals);
        return program(data);
      }) as T,
  };
}
