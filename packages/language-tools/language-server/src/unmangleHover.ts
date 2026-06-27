import type { Hover, MarkedString } from "@volar/language-server";
import { unmangle, unmangleValue } from "./unmangle.js";

function unmangleMarkedString(content: MarkedString): MarkedString {
  return typeof content === "string"
    ? unmangle(content)
    : unmangleValue(content);
}

export default function unmangleHover(hover: Hover): Hover {
  const { contents } = hover;
  if (typeof contents === "string") {
    return { ...hover, contents: unmangle(contents) };
  }
  if (Array.isArray(contents)) {
    return { ...hover, contents: contents.map(unmangleMarkedString) };
  }
  return { ...hover, contents: unmangleValue(contents) };
}
