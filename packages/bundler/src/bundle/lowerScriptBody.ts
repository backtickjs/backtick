import {
  isComponentTag,
  isFragmentTag,
  jsxText,
  type Splice,
} from "@backtickjs/client-script";
import type * as ES from "estree";
import type * as JSX from "estree-jsx";
import {
  call,
  identifier,
  jsxComponent,
  jsxElement,
  stringLiteral,
} from "../estree.js";
import type { ScriptEntry } from "./ScriptEntry.js";
import { sourceName } from "./bindingKey.js";

type Body = ES.Expression | ES.BlockStatement;

// The client's names a bundle calls, which a script's own binding must not hide.
const RUNTIME = new Set(["fixed", "jsx"]);

// A binding annotated by the compiler with the key it resolved it to.
type Bound = { readonly key?: string };

/**
 * A script's body, as the compiler wrote it, lowered to the entry it is in a
 * bundle: closed over what it needs from outside, and drawing through `jsx`.
 *
 * - A binding it captures reads as its numbered parameter: an entry takes a
 *   thunk per splice and then a value per capture, in the orders the script
 *   fixes. `$` cannot start a source name, so a capture is never shadowed by
 *   a local.
 * - A splice is a call of its thunk, handed the bindings in scope at the hole
 *   and then every capture, which is what a fragment landing there could need.
 * - JSX is a call of the client's `jsx`, and its text reads as JSX reads it.
 * - `eval` is called indirectly, so a bundle it runs sees globals and nothing
 *   of this one's scope.
 * - A binding named `jsx` or `fixed` is renamed, so it cannot hide the
 *   client's.
 */
export function lowerScriptBody(script: ScriptEntry): Body {
  const captureIndex = new Map(
    script.captures.map((key, at) => [key, script.splices.length + at]),
  );
  const holes = new Map(
    script.splices.map((splice, index) => [splice.key, index] as const),
  );
  const paramsOf = new Map(
    script.splices.map((splice) => [splice.key, splice.params] as const),
  );

  const read = (
    key: string,
    name: string,
    loc: ES.SourceLocation | null | undefined,
  ): ES.Identifier => {
    const at = captureIndex.get(key);
    return {
      ...identifier(
        at !== undefined ? `$${at}` : RUNTIME.has(name) ? `$${name}` : name,
      ),
      loc,
    };
  };

  const splice = (
    key: string,
    loc: ES.SourceLocation | null | undefined,
  ): ES.Expression => {
    const index = holes.get(key);
    if (index === undefined) {
      throw new Error(`This script has no \`${key}\` splice.`);
    }
    const args = [...(paramsOf.get(key) ?? []), ...script.captures].map(
      (bound) => read(bound, sourceName(bound), loc),
    );
    return {
      ...call({ ...identifier(`$${index}`), loc }, args),
      loc,
    };
  };

  function lowerJsx(node: JSX.JSXElement | JSX.JSXFragment): ES.Expression {
    // What JSX reads as nothing is nothing: text left empty by its whitespace
    // rule, and an empty `{}`.
    const children = (node.children as JSX.JSXElement["children"]).flatMap(
      (child): ES.Expression[] => {
        switch (child.type) {
          case "JSXText": {
            const text = jsxText(child.value);
            return text === null
              ? []
              : [{ ...stringLiteral(text), loc: child.loc }];
          }
          case "JSXExpressionContainer":
            return child.expression.type === "JSXEmptyExpression"
              ? []
              : [lower(child.expression) as ES.Expression];
          case "JSXElement":
          case "JSXFragment":
            return [lowerJsx(child)];
          default:
            throw new Error(`\`${child.type}\` isn't a child a script writes.`);
        }
      },
    );
    // One child stands on its own; several are an array. None is `null`.
    const drawn: ES.Expression | null =
      children.length === 0
        ? null
        : children.length === 1
          ? children[0]!
          : { type: "ArrayExpression", elements: children };

    const lowered = ((): ES.Expression => {
      const opening = node.type === "JSXElement" ? node.openingElement : null;
      const tag = opening?.name as (JSX.JSXIdentifier & Bound) | undefined;
      if (tag === undefined || isFragmentTag(tag.name)) {
        return jsxElement(null, "Fragment", [], drawn);
      }
      // A valueless attribute is the `true` it means.
      const written = (opening!.attributes as JSX.JSXAttribute[]).map(
        (attribute) =>
          [
            (attribute.name as JSX.JSXIdentifier).name,
            attribute.value === null
              ? ({ type: "Literal", value: true } as ES.Literal)
              : attribute.value.type === "JSXExpressionContainer"
                ? (lower(attribute.value.expression) as ES.Expression)
                : (lower(attribute.value) as ES.Expression),
          ] as const,
      );
      // A component the script holds is called with its props.
      if (tag.key !== undefined) {
        return jsxComponent(
          null,
          read(tag.key, tag.name, tag.loc),
          written,
          drawn,
        );
      }
      // A component tag naming a host binding reaches it by splice, under
      // `$<name>`.
      if (isComponentTag(tag.name)) {
        return jsxComponent(
          null,
          splice(`$${tag.name}`, tag.loc),
          written,
          drawn,
        );
      }
      return jsxElement(null, tag.name, written, drawn);
    })();
    // On the node itself: an element is known by the call that built it.
    lowered.loc = node.loc;
    return lowered;
  }

  function lower(node: unknown): unknown {
    if (Array.isArray(node)) {
      return node.map(lower);
    }
    if (node === null || typeof node !== "object") {
      return node;
    }
    const held = node as ES.Node & Bound;
    switch (held.type) {
      case "Splice":
        return splice((held as unknown as Splice).key, held.loc);
      case "Identifier":
        if (held.key !== undefined) {
          return read(held.key, held.name, held.loc);
        }
        return held.name === "eval"
          ? {
              type: "SequenceExpression",
              expressions: [{ type: "Literal", value: 0 }, identifier("eval")],
              loc: held.loc,
            }
          : { ...held };
      case "JSXElement":
      case "JSXFragment":
        return lowerJsx(held as JSX.JSXElement | JSX.JSXFragment);
      // Escaped, so no `</script>` appears when the bundle is inlined.
      case "Literal":
        return typeof held.value === "string"
          ? { ...stringLiteral(held.value), loc: held.loc }
          : { ...held };
      // Braced, so an `else` never attaches to an `if` nested inside.
      case "IfStatement": {
        const consequent = lower(held.consequent) as ES.Statement;
        return {
          ...held,
          test: lower(held.test),
          consequent:
            consequent.type === "BlockStatement"
              ? consequent
              : {
                  type: "BlockStatement",
                  body: [consequent],
                  loc: consequent.loc,
                },
          alternate: lower(held.alternate),
        };
      }
      default:
        return Object.fromEntries(
          Object.entries(held).map(([field, value]) => [
            field,
            field === "loc" ? value : lower(value),
          ]),
        );
    }
  }

  return lower(script.body) as Body;
}
