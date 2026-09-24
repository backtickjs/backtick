// Long enough for the timer the component set, and for a component built
// again to have set another.
export const settled = () => new Promise((settle) => setTimeout(settle, 100));

// What an element ended up in, read off the document rather than off what the
// renderer was asked for: a tag in SVG's namespace is written `svg:<tag>`, as
// the runtime names one, and a tag in HTML's is written bare.
const SVG = "http://www.w3.org/2000/svg";

export function namespaced(parent: Node): string[] {
  return [...parent.childNodes].flatMap((child) => {
    if (child.nodeType !== child.ELEMENT_NODE) {
      return namespaced(child);
    }
    const element = child as Element;
    const tag =
      element.namespaceURI === SVG
        ? `svg:${element.tagName}`
        : element.tagName.toLowerCase();
    return [tag, ...namespaced(child)];
  });
}
