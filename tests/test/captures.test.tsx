import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type { BacktickElement, Client, Prop } from "@backtickjs/core";
import type { JSX } from "@backtickjs/web-sdk";
import { snapshotCase } from "./snapshotCase.ts";

// Bindings a nested script captures from the scripts around it, and how
// shadowing decides which binding a name reaches.

// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
const capturedCounter = cs`{
  let count = 0;
  const bump = () => {
    count = count + 1;
    return count;
  };
  return bump() + bump();
}`;

// Three scripts, and the binding skips the middle one.
//
// The outer script declares `outer`; the innermost references it. The script
// between them neither declares nor mentions it, so it has no capture of its
// own — the binding still has to reach through it, and the outer script has to
// know its declaration escaped even though the script that took it is two
// levels down.
//
// Two call sites make the outer script polymorphic, so its splice arrives as a
// thunk: `captured` is what the hole hands that thunk, which is the only place
// a wrong answer would show up.
function wrap(start: Client<number>): Client<number> {
  return cs`{
    const outer = $start;
    return ${cs`{
      const middle = 10;
      return middle + ${cs`outer`};
    }`};
  }`;
}

const deepCapture = cs`${wrap(cs`1`)} + ${wrap(cs`2`)}`;

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs`$lhs + $rhs`;
}

const deepNestedScripts = cs`${add(cs`1`, cs`2`)}`;

// `cs`base`` is written under the outer `base`, but is threaded through two host
// functions that each shadow `base` with their own binding. The captured value
// must reach the leaf untouched, so the threaded channel is renamed away from
// every `base` it passes through.
const deepShadowing = cs`{
  const base = 10;
  return ${outerBase(cs`base`)};
}`;

function outerBase(inner: Client<number>): Client<number> {
  return cs`{
    const base = 1;
    return base + ${middleBase(inner)};
  }`;
}

function middleBase(inner: Client<number>): Client<number> {
  return cs`{
    const base = 2;
    return base * $inner;
  }`;
}

// Two distinct captures of one entry that want the same name.
//
// An entry's own free variables can never collide — within one script `base`
// resolves outward to exactly one binding. But an entry also receives whatever
// the arguments it inlines capture, and a fragment written under the outer
// `base` can be carried by host code into a script written under the inner one.
// Both then land in the same environment, under the same source name.
//
// Everything stays nested so both bindings are actually in scope where they are
// threaded to — carrying the fragment somewhere the outer `base` does not
// enclose is a different error.
function innerBase(carried: Client<number>): Client<number> {
  return cs`{
    const base = 100;
    return ${cs`base + $carried`};
  }`;
}

const foreignCaptureShadow = cs`{
  const base = 1;
  return ${innerBase(cs`base`)};
}`;

const nestedScripts = cs`{
  const x = 0;
  return ${cs`x`};
}`;

// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and a
// block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrapShadowed(fragment: Client<number>): Client<number> {
  return cs`{
    const total = 1;
    {
      const total = 2;
      return total + $fragment;
    }
  }`;
}

const shadowedHole = cs`${wrapShadowed(cs`10`)} + ${wrapShadowed(cs`20`)}`;

const shadowing = cs`{
  const total = 1;
  return ${addOwnTotal(cs`total`, 100)};
}`;

function addOwnTotal(lhs: Client<number>, rhs: number): Client<number> {
  return cs`{
    let total = 0;
    total = total + $lhs;
    total = total + $rhs;
    return total;
  }`;
}

// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script: Client<() => JSX.Element> = cs`() => {
  const x = 1;
  return ${(<span onclick={cs`() => x`} />)};
}`;
const jsxCapture = script;

// A host component, and a binding of the same name an enclosing script holds.
// Scope decides: the nested script's `<Card>` is the captured function, and
// only the one outside every script binding it is the host's.
async function Card(props: { title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label: Client<string>) {
  return cs`{
    const Card = (props: { n: number }) => <i>{$label + props.n}</i>;
    return <p>{${cs`<Card n={1} />`}}</p>;
  }`;
}

const scriptBoundTagCaptureShadow = cs`<div>
  <Card title="host" />
  {${labelled(cs`"a"`)}}
  {${labelled(cs`"b"`)}}
</div>`;

// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
const scriptBoundTagParam = cs`{
  const twice = (Row: (p: { n: number }) => BacktickElement) => (
    <ul>
      {${cs`<Row n={1} />`}}
      {${cs`<Row n={2} />`}}
    </ul>
  );
  return twice((p: { n: number }) => <li>{"row " + p.n}</li>);
}`;

// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same name
// is the host's component, spliced as before.
const scriptBoundTagScope = cs`{
  const twice = (Card: (props: { n: number }) => BacktickElement) => (
    <div>
      <Card n={1} />
      <Card n={2} />
    </div>
  );

  return (
    <section>
      <Card title="host" />
      {twice((props: { n: number }) => (
        <i>{"row " + props.n}</i>
      ))}
    </section>
  );
}`;

describe("what each case compiles and bundles to", () => {
  it("capturedCounter", async (t) => {
    await snapshotCase(t, "capturedCounter", capturedCounter);
  });

  it("deepCapture", async (t) => {
    await snapshotCase(t, "deepCapture", deepCapture);
  });

  it("deepNestedScripts", async (t) => {
    await snapshotCase(t, "deepNestedScripts", deepNestedScripts);
  });

  it("deepShadowing", async (t) => {
    await snapshotCase(t, "deepShadowing", deepShadowing);
  });

  it("foreignCaptureShadow", async (t) => {
    await snapshotCase(t, "foreignCaptureShadow", foreignCaptureShadow);
  });

  it("nestedScripts", async (t) => {
    await snapshotCase(t, "nestedScripts", nestedScripts);
  });

  it("shadowedHole", async (t) => {
    await snapshotCase(t, "shadowedHole", shadowedHole);
  });

  it("shadowing", async (t) => {
    await snapshotCase(t, "shadowing", shadowing);
  });

  it("jsxCapture", async (t) => {
    await snapshotCase(t, "jsxCapture", jsxCapture);
  });

  it("scriptBoundTagCaptureShadow", async (t) => {
    await snapshotCase(
      t,
      "scriptBoundTagCaptureShadow",
      scriptBoundTagCaptureShadow,
    );
  });

  it("scriptBoundTagParam", async (t) => {
    await snapshotCase(t, "scriptBoundTagParam", scriptBoundTagParam);
  });

  it("scriptBoundTagScope", async (t) => {
    await snapshotCase(t, "scriptBoundTagScope", scriptBoundTagScope);
  });
});
