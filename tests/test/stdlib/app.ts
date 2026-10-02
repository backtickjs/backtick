// A module an app adds beside Solid, which a bundle imports by its specifier.
export const greet = (): string => "hello";

const held: Record<string, string> = { greeting: "hei" };
export const storage = {
  get: (key: string): string | null => held[key] ?? null,
};
