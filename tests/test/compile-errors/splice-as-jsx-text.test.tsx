import { cs } from "@backtickjs/core";

// A `${…}` written as an element's child is JSX text, which nothing reads as a
// splice: as a child it is written in braces, `{${…}}`.
const asText = (count: number) => cs`<p>count: ${count + 1}</p>`;
