const MANGLE_RE = /\$0var_/g;

// Strip the compiler's virtual `$0var_` identifier prefix
export function unmangle(text: string): string {
  return text.replace(MANGLE_RE, "");
}

export function unmangleValue<T extends { value: string }>(content: T): T {
  return { ...content, value: unmangle(content.value) };
}
