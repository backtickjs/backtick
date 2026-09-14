import { cs, For } from "@backtickjs/core";

// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs`<circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" />`;
}

export default cs`{
  const Dot = (props: { x: number }) => (
    <circle cx={props.x} cy="5" r="2">
      <title>{"dot " + props.x}</title>
    </circle>
  );

  return (
    <div>
      <a href="/shapes">{"shapes"}</a>
      <svg viewBox="0 0 30 10" width="120">
        <Ring />
        <For each={[10, 20]}>{(x: number) => <Dot x={x} />}</For>
        <foreignObject x="0" y="0" width="10" height="10">
          <p>{"html again"}</p>
        </foreignObject>
      </svg>
    </div>
  );
}`;
