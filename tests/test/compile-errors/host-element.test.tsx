import { cs } from "@backtickjs/core";

// An intrinsic element is drawn by the client, so it is written in a script. In
// host code it is refused wherever it stands, a splice being host code too.
async function Day(props: { children?: unknown }) {
  return cs`<li>day</li>`;
}

export const element = <div />;
export const paired = <p>text</p>;
export const asChild = (
  <Day>
    <span />
  </Day>
);
export const inSplice = cs`<ul>{${(<li />)}}</ul>`;
export const custom = <my-widget />;

// Not refused: a server component, and a fragment around one.
export const server = <Day />;
export const fragment = (
  <>
    <Day />
  </>
);
