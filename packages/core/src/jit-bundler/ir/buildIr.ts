import type { AstNode } from "../ast/nodes/AstNode.js";
import { RuntimeArray } from "../ast/nodes/RuntimeArray.js";
import { RuntimeBoolean } from "../ast/nodes/RuntimeBoolean.js";
import { RuntimeNull } from "../ast/nodes/RuntimeNull.js";
import { RuntimeNumber } from "../ast/nodes/RuntimeNumber.js";
import { RuntimeObject } from "../ast/nodes/RuntimeObject.js";
import { RuntimeString } from "../ast/nodes/RuntimeString.js";
import { SourceClientScript } from "../ast/nodes/SourceClientScript.js";
import { locKey } from "../locKey.js";
import { IrArray } from "./nodes/IrArray.js";
import { IrBoolean } from "./nodes/IrBoolean.js";
import { IrCall } from "./nodes/IrCall.js";
import { IrFunction } from "./nodes/IrFunction.js";
import { IrNull } from "./nodes/IrNull.js";
import { IrNumber } from "./nodes/IrNumber.js";
import { IrObject } from "./nodes/IrObject.js";
import { IrString } from "./nodes/IrString.js";
import type { IrValue } from "./nodes/IrValue.js";
import type { IrPayload } from "./Payload.js";

// Lowers an AST into a flat function table: one `IrFunction` per distinct client
// script (deduplicated by source location), where a nested script becomes an
// `IrCall` into the table. The builder owns the table and the dedup index so the
// entrypoint and every nested call are produced by the same `call()` path.
class IrBuilder {
  readonly functions: IrFunction[] = [];
  private readonly indexByLoc = new Map<string, number>();

  // Lowers a client script to a call that targets its function-table entry,
  // interning the entry and lowering its splices into positional arguments.
  call(script: SourceClientScript): IrCall {
    return new IrCall(
      this.intern(script),
      script.splices.map((n) => this.lower(n)),
    );
  }

  // Returns the table index of a script's entry, adding it on first sight.
  private intern(script: SourceClientScript): number {
    const key = locKey(script.loc);
    const existing = this.indexByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    // Reserve the slot before lowering splices so a script that (transitively)
    // references itself resolves to a stable index rather than recursing.
    const index = this.functions.length;
    this.indexByLoc.set(key, index);
    this.functions.push(
      new IrFunction(
        script.loc,
        script.splices.length,
        script.freeVars,
        script.expression,
      ),
    );
    return index;
  }

  // Lowers a spliced-in value: nested scripts become calls, everything else is a
  // runtime constant carried through as data.
  private lower(node: AstNode): IrValue {
    if (node instanceof SourceClientScript) {
      return this.call(node);
    }
    if (node instanceof RuntimeArray) {
      return new IrArray(node.elements.map((n) => this.lower(n)));
    }
    if (node instanceof RuntimeObject) {
      const entries: Record<string, IrValue> = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = this.lower(value);
      }
      return new IrObject(entries);
    }
    if (node instanceof RuntimeNumber) {
      return new IrNumber(node.value);
    }
    if (node instanceof RuntimeString) {
      return new IrString(node.value);
    }
    if (node instanceof RuntimeBoolean) {
      return new IrBoolean(node.value);
    }
    if (node instanceof RuntimeNull) {
      return new IrNull();
    }
    throw new Error(
      `Cannot lower ${node.constructor.name} into a payload; only client ` +
        "scripts and runtime values may be spliced into a bundle.",
    );
  }
}

// Builds the IR payload from a client script's AST: a flat function table with
// one entry per distinct client script (deduplicated by source location) plus a
// call naming the entrypoint. Nested scripts, wherever they appear in the splice
// values, are hoisted into the table and replaced by `IrCall`s.
export function buildIr(node: AstNode): IrPayload {
  if (!(node instanceof SourceClientScript)) {
    throw new Error("A payload's entrypoint must be a client script.");
  }
  const builder = new IrBuilder();
  const root = builder.call(node);
  return { functions: builder.functions, root };
}
