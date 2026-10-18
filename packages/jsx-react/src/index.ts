import { type JSX, jsx } from "./jsx-runtime.js";

/**
 * What the JSX transform calls, from this package's root, for a tag whose
 * `key` follows a spread, so it can't pass the key apart: `jsx`, with the key
 * and the children taken out of the props.
 */
export function createElement(
  type: JSX.ElementType,
  config: object | null,
  ...children: unknown[]
): JSX.Element {
  const { key, ...props } = (config ?? {}) as {
    key?: string | number;
    [prop: string]: unknown;
  };
  if (children.length > 0) {
    props.children = children.length === 1 ? children[0] : children;
  }
  return jsx(type, props, key);
}
