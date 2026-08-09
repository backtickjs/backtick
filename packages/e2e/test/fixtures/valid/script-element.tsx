import { cs, state } from "@backtickjs/core";

// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  const label = state("hi");

  // A handler written inline and one held under a name: both are client code,
  // and a handler prop takes `Client<() => void>` and nothing else.
  const row = cs`(size: number) => {
    const css = "font-size: " + size + "px";
    const press = () => $label.write("held");
    return (
      <div style={css}>
        <span style={css} onclick={() => $label.write("pressed")}>
          {$label.read()}
        </span>
        <span style="font-size: 8px">fixed</span>
        <span style={css} onclick={press}>
          held
        </span>
      </div>
    );
  }`;

  return <div style="padding: 0">{cs`$row(12)`}</div>;
}

export default <Card />;
