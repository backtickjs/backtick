// A module an app adds beside Solid, which a bundle imports by its specifier.
export const greet = (): string => "hello";

const held: Record<string, string> = { greeting: "hei" };
export const storage = {
  get: (key: string): string | null => held[key] ?? null,
};

// A namespace of classes, as React Native's `Animated` is: constructed through
// a member, `new $geometry.Circle(2)`.
export const geometry = {
  Circle: class Circle {
    readonly radius: number;
    constructor(radius: number) {
      this.radius = radius;
    }
    get diameter(): number {
      return this.radius * 2;
    }
  },
};
