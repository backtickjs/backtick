import { cs } from "@backtickjs/core";

// A `${…}` in text isn't a splice, so it keeps its braces; the one in code is
// shortened.
export const inText = (name: string) => cs`{
  // ${name}
  const greeting = "Hello, ${name}";
  return <p title="${name}">count: ${name} {${name}}</p>;
}`;
