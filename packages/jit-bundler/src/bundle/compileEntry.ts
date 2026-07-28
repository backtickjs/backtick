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

// Where each capture sits in that object: its source name, or a cell's own
// reserved key — `#` can't appear in an identifier, so a cell can never collide
// with a variable.
//
// Two captures can still want one name. An entry's own free variables can't
// collide (within a script a name resolves outward to exactly one binding), but
// a fragment carried in by host code brings the captures it was written under,
// so `foreign-capture-shadow` lands two `base`s in one entry. Hence the suffix.
//
// Exported because a call site builds the object this reads. Both sides derive
// it from the same script, so they agree without having to be told.
export function environmentKeys(
  script: IrScriptEntry,
): ReadonlyMap<string, string> {
  const keys = new Map<string, string>();
  const taken = new Set<string>();
  for (const key of script.captures) {
    if (isCellKey(key)) {
      keys.set(key, key);
      continue;
    }
    const base = sourceName(key);
    let name = base;
    for (let n = 2; taken.has(name); n++) {
      name = `${base}${n}`;
    }
    taken.add(name);
    keys.set(key, name);
  }
  return keys;
}

export function compileEntry(script: IrScriptEntry): BundleArrowNode {
  const env = environmentKeys(script);

  // Names are minted per entry, over the names this body uses and nothing else.
  // A call site reads none of them — it hands its arguments positionally — so
  // there is nothing outside to agree with.
  const names = new Map<string, string>();
  const used = new Set<string>();
  const displayName = (key: string): string => {
    const existing = names.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const base = sourceName(key);
    let name = base;
    for (let n = 2; used.has(name); n++) {
      name = `${base}${n}`;
    }
    used.add(name);
    names.set(key, name);
    return name;
  };

  // A binding the script declares reads as itself; one it captures reads off the
  // environment, so a read says where its value came from.
  const read = (key: string): BundleExpressionNode => {
    const name = env.get(key);
    return name === undefined
      ? { "#": NodeKind.Identifier, [NodeField.name]: displayName(key) }
      : {
          "#": NodeKind.Property,
          [NodeField.object]: {
            "#": NodeKind.Identifier,
            [NodeField.name]: envParam,
          },
          [NodeField.name]: name,
        };
  };

  // The body references holes by key; a reference's `args` are positional in the
  // script's `splices` order, so this maps between them.
  const holes = new Map(script.splices.map((key, index) => [key, index]));
  const renderSplice: RenderSplice = (key) => {
    const index = holes.get(key);
    if (index === undefined) {
      throw new Error(`This script has no \`${key}\` splice.`);
    }
    // What the hole hands its thunk: the bindings this script declares that are
    // bound where the hole sits (see `spliceScopes`). A fragment landing there
    // can only reference what was in scope where it was written.
    const args = (script.spliceScopes[key] ?? []).map((bound) => ({
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
    ...(env.size === 0 ? [] : [envParam]),
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
