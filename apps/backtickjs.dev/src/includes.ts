// A fence naming an example file and nothing else, as
//
//     ```tsx file=quick-start/server/Home.tsx
//     ```
//
// (Prettier leaves a blank line inside) is that file, from
// `content/examples/`, shown under its name within the example:
// `server/Home.tsx`. The examples are type-checked and tested, so what a page
// shows works. With `diff=` naming another file, as the tutorial's previous
// step, the site shows the whole file with the lines that differ marked, and
// the Markdown agents read shows a unified diff. With `details="…"`, the file
// is folded away under that summary.
export const INCLUDE =
  /^```(\w+) file=(\S+)(?: diff=(\S+))?(?: (details="[^"]*"))?\n\s*```$/gm;
