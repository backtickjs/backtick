export function isType(
  value: unknown,
  type: string,
): value is { readonly type: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value["type"] === type
  );
}
