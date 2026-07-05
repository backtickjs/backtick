import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../ast/nodes/AstNode.js";
import { RuntimeArray } from "../ast/nodes/RuntimeArray.js";
import { RuntimeBoolean } from "../ast/nodes/RuntimeBoolean.js";
import { RuntimeNull } from "../ast/nodes/RuntimeNull.js";
import { RuntimeNumber } from "../ast/nodes/RuntimeNumber.js";
import { RuntimeObject } from "../ast/nodes/RuntimeObject.js";
import { RuntimeString } from "../ast/nodes/RuntimeString.js";
import { SourceClientScript } from "../ast/nodes/SourceClientScript.js";
import { IrArray } from "./nodes/IrArray.js";
import { IrBoolean } from "./nodes/IrBoolean.js";
import { IrFunction } from "./nodes/IrFunction.js";
import { IrFunctionRef } from "./nodes/IrFunctionRef.js";
import { IrNull } from "./nodes/IrNull.js";
import { IrNumber } from "./nodes/IrNumber.js";
import { IrObject } from "./nodes/IrObject.js";
import { IrString } from "./nodes/IrString.js";
import type { IrValue } from "./nodes/IrValue.js";
import type { IrPayload } from "./Payload.js";

function cacheKey(loc: SourceLocation): string {
  return `${loc.path}:${loc.start.line}:${loc.start.character}:${loc.end.line}:${loc.end.character}`;
}

// Builds the IR payload from a client script's AST: a flat function table with
// one entry per distinct client script (deduplicated by source location) plus a
// reference to the entrypoint. Nested scripts, wherever they appear in the
// splice values, are hoisted into the table and replaced by `IrFunctionRef`s.
export function buildIr(node: AstNode): IrPayload {
  const functions: IrFunction[] = [];
  const indexByLoc = new Map<string, number>();

  function intern(script: SourceClientScript): number {
    const key = cacheKey(script.loc);
    const existing = indexByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    // Assign the slot before lowering splices so a script that (transitively)
    // references itself resolves to a stable index rather than recursing.
    const index = functions.length;
    indexByLoc.set(key, index);
    functions.push(
      new IrFunction(script.loc, script.freeVars, script.expression),
    );
    return index;
  }

  function lower(node: AstNode): IrValue {
    if (node instanceof SourceClientScript) {
      return new IrFunctionRef(intern(node), node.splices.map(lower));
    }
    if (node instanceof RuntimeArray) {
      return new IrArray(node.elements.map(lower));
    }
    if (node instanceof RuntimeObject) {
      const entries: Record<string, IrValue> = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = lower(value);
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

  if (!(node instanceof SourceClientScript)) {
    throw new Error("A payload's entrypoint must be a client script.");
  }
  const root = new IrFunctionRef(intern(node), node.splices.map(lower));
  return { functions, root };
}
