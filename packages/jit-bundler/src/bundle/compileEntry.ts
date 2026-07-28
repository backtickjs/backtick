import type { IrScriptEntry } from "../ir/Ir.js";
import { isCellKey, sourceName } from "./bindingKey.js";
import { NodeField, NodeKind } from "./Bundle.js";
import type { BundleArrowNode, BundleExpressionNode } from "./Bundle.js";
import { lowerScriptBody, type RenderSplice } from "./lowerScriptBody.js";

// Compiles one script to its `functions` entry.
//
// The signature is the point: a script goes in and an arrow comes out, and
// there is no way to reach another entry, the reference walk, or any table
// being assembled. So the same script compiles to the same entry in every
// bundle it appears in — which is what a client would need to cache one across
// requests, and what a per-file debug map would be keyed on.
//
// Keeping it that way is a matter of not adding a parameter. Anything this
// needed from the bundle would be exactly the coupling the split exists to
// prevent.

// The parameter an entry receives its captures under.
export const envParam = "$env";

// Where a capture sits in that object: its source name, or a cell's own
// reserved key — `#` can't appear in an identifier, so a cell can never collide
// with a variable.
//
// No disambiguation, because two captures of one entry can't want one name: an
// entry's captures are its script's free variables, and within a script a name
// resolves outward to exactly one binding. That was not always so — while a
// monomorphic entry folded in the captures of arguments it inlined, a fragment
// carried in under a different `base` could land beside the entry's own.
//
// Exported because a call site builds the object this names. Both sides read
// the key, so they agree without having to be told.
export function envKey(key: string): string {
  return isCellKey(key) ? key : sourceName(key);
}

export function compileEntry(script: IrScriptEntry): BundleArrowNode {
  const captured = new Set(script.captures);

  // Names are the source's own, undisambiguated.
  //
  // Two of a script's bindings can share a name only by shadowing, and then
  // printing both under it is what the source says — a block frames its own
  // declarations, so the inner one shadows the outer exactly as written. The one
  // case that needed telling them apart was a hole reaching a binding an inner
  // scope shadows, and that is now refused outright (see `spliceParams`): a hole
  // is only offered what is reachable by name where it sits.
  const displayName = sourceName;

  // A binding the script declares reads as itself; one it captures reads off the
  // environment, so a read says where its value came from.
  const read = (key: string): BundleExpressionNode =>
    captured.has(key)
      ? {
          "#": NodeKind.Property,
          [NodeField.object]: {
            "#": NodeKind.Identifier,
            [NodeField.name]: envParam,
          },
          [NodeField.name]: envKey(key),
        }
      : { "#": NodeKind.Identifier, [NodeField.name]: displayName(key) };

  // The body references holes by key; a reference's `args` are positional in the
  // script's `splices` order, so this maps between them.
  const holes = new Map(script.splices.map((key, index) => [key, index]));
  const renderSplice: RenderSplice = (key) => {
    const index = holes.get(key);
    if (index === undefined) {
      throw new Error(`This script has no \`${key}\` splice.`);
    }
    // What the hole hands its thunk: the bindings this script declares that are
    // bound where the hole sits (see `spliceParams`). A fragment landing there
    // can only reference what was in scope where it was written.
    const args = (script.spliceParams[key] ?? []).map((bound) => ({
      "#": NodeKind.Identifier,
      [NodeField.name]: displayName(bound),
    }));
    return {
      "#": NodeKind.Call,
      [NodeField.callee]: {
        "#": NodeKind.Identifier,
        [NodeField.name]: `$${index}`,
      },
      ...(args.length === 0 ? {} : { [NodeField.args]: args }),
    };
  };

  // One parameter per splice the script writes, then the environment when it
  // captures anything — both read off the script, so the shape is its own.
  const params = [
    ...script.splices.map((_, i) => `$${i}`),
    ...(captured.size === 0 ? [] : [envParam]),
  ];
  return {
    "#": NodeKind.Arrow,
    ...(params.length === 0 ? {} : { [NodeField.params]: params }),
    [NodeField.body]: lowerScriptBody(
      script.body,
      renderSplice,
      displayName,
      read,
    ),
  };
}
