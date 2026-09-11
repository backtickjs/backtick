// The prefix the compiler adds to client-script identifiers when virtualizing.
const CS_PREFIX = "__cs_";

export function mangle(identifier: string): string {
  return `${CS_PREFIX}${identifier}`;
}

export function unmangle(text: string): string {
  return text.replaceAll(CS_PREFIX, "");
}
