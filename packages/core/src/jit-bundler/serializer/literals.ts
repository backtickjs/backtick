export function serializePrimitive(
  value: null | boolean | number | string,
): string {
  return typeof value === "string" ? `"${value}"` : String(value);
}

export function serializeArray<T>(
  elements: readonly T[],
  render: (element: T) => string,
): string {
  return `[${elements.map(render).join(", ")}]`;
}

export function serializeObject<T>(
  entries: Readonly<Record<string, T>>,
  render: (value: T) => string,
): string {
  const body = Object.entries(entries)
    .map(([key, value]) => `${key}: ${render(value)}`)
    .join(", ");
  return `({${body}})`;
}
