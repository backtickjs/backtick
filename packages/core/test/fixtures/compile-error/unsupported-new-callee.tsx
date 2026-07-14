import { cs } from "@backtickjs/core";

class Point {}

// A construction needs the class itself, which only splicing can attach — a
// bare name carries no host class reference, even one that is in scope.
const script = cs`() => new Point(1, 2)`;
