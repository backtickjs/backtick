/**
 * What the editor opens on.
 *
 * One example, and short enough to read without scrolling — a reader deciding
 * whether to keep reading will not scroll a code box to find the point. That
 * budget is what picked the design: a card whose whole surface is the control,
 * because a segmented switch or a chart costs six style constants and this
 * costs three.
 *
 * The look and the plans are both server constants, spliced in. That is how
 * this repo writes a component, and it is also the argument the page is making
 * — the line between the half that ships and the half that never does runs
 * right through the middle of the file.
 */
export interface Example {
  readonly name: string;
  readonly source: string;
}

const SOURCE = `import { cs, For, state } from "@backtickjs/core";

export default async function Wave() {
  return cs\`{
    const card =
      "display: flex; align-items: center; gap: 5px; width: 280px;" +
      " height: 170px; padding: 20px; cursor: pointer;" +
      " box-sizing: border-box; border-radius: 22px;" +
      " background: linear-gradient(#1e1b4b,#0f172a)";
    const bar =
      "flex: 1; border-radius: 99px; transition: height 90ms linear;" +
      " background: linear-gradient(#f472b6,#7c3aed); height: ";
    const t = $state(0);
    const id = $state(0);
    const tick = () => t.update((v) => v + 1);
    const run = () => {
      clearInterval(id.read());
      id.write(id.read() === 0 ? setInterval(tick, 90) : 0);
    };
    return (
      <div style={card} onclick={run}>
        <For each={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5]}>
          {(p: number) => (
            <div style={bar + (65 + 55 * Math.sin(t.read() / 3 + p)) + "px"} />
          )}
        </For>
      </div>
    );
  }\`;
}
`;

export const EXAMPLE: Example = {
  name: "A wave",
  // Trimmed, because a source file ends in a newline and a textarea should not:
  // there it is a blank last line the caret can rest on, below the code, for
  // nothing.
  source: SOURCE.trimEnd(),
};
