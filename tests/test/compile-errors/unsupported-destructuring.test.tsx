import { cs } from "@backtickjs/core";

const array = cs`{
  const [a, b] = [1, 2];
  return a + b;
}`;

const object = cs`{
  const { a } = { a: 1 };
  return a;
}`;
