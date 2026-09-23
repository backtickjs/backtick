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

/**
 * A printed bundle as the client runs it: the globals its expression reads,
 * and the expression behind a function, so it runs once they are there. See
 * `printBundle`.
 */
export interface Program {
  readonly globals: readonly string[];
  readonly run: () => ClientValue;
}

/** Wired as the interpreter is, and to the global object programs read. */
export interface RuntimeOptions extends InterpreterOptions {
  /**
   * The global object of the realm a program runs in, the window's where
   * left out. A program evaluated in another realm, as a test runner's is,
   * reads that realm's.
   */
  readonly global?: object;
}

/** What the runtime does with a program: `Interpreter`'s two, for one. */
export interface PrintedRuntime<NodeType extends object> {
  render(program: Program, parent: NodeType, anchor?: NodeType): () => void;
  evaluate<T extends ClientUnknown>(program: Program): T;
}

type Globals = { [name: string]: unknown };

// The builtins a runtime put on a global object, which the next runtime to run
// a program there asks for again: two targets may answer the same name
// differently.
const installed = new WeakMap<object, Set<string>>();

/**
 * The runtime printed bundles run on, wired to a window as the interpreter is.
 *
 * What a module reads as a global is put on `globalThis` before it runs: the
 * runtime's own functions, and every builtin it names that the global object
 * does not already hold.
 */
export function createRuntime(
  options: RuntimeOptions,
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
    const scope = (options.global ?? options.window) as Globals;
    let ours = installed.get(scope);
    if (ours === undefined) {
      ours = new Set();
      installed.set(scope, ours);
    }
    Object.assign(scope, own);
    for (const name of names) {
      if (ours.has(name)) {
        delete scope[name];
        ours.delete(name);
      }
      if (name in scope) {
        continue;
      }
      const value = builtinOf(instance, name);
      if (value === undefined) {
        throw new Error(`unknown builtin ${name}`);
      }
      scope[name] = value;
      ours.add(name);
    }
  };
  return {
    render: ({ globals, run }, parent, anchor) =>
      createRoot((dispose) => {
        install(globals);
        renderer.insert(parent, run(), anchor);
        return dispose;
      }),
    evaluate: <T extends ClientUnknown>({ globals, run }: Program) =>
      createRoot(() => {
        install(globals);
        return run();
      }) as T,
  };
}
