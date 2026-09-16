import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { snapshotCase } from "./snapshotCase.ts";

// Components: what a host component may answer with, where one instance ends
// and the next begins, the props it takes, components written inside scripts,
// and the event handlers a drawing is handed.

// A component stands exactly where its tag did, so what it may answer with is
// what may stand there: one drawing, or nothing at all. Text and a list are
// neither — a component with several children to give, or a bare string, wraps
// them in a fragment, which is the one drawing that holds them and draws no
// node of its own.
async function Label() {
  return <>counted</>;
}

async function Pair() {
  return (
    <>
      <em>one</em>
      <em>two</em>
    </>
  );
}

const componentAnswersChildren = (
  <div>
    <Label />
    <Pair />
  </div>
);

// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs`{
    const n = $state(2);
    return <em>{n.read()}</em>;
  }`;
}

const componentAnswersScript = (
  <div>
    <Panel />
  </div>
);

// A server component's invocation is an instance boundary, so it hoists into a
// tree entry of its own even though each `<TextLabel />` is referenced once and
// would otherwise inline into the `View`. The entry is what a per-instance cell
// will belong to, so it can't depend on how many places reference the element.
//
// The component leaves no named trace: the payload carries `Text`, never
// `TextLabel`.
async function TextLabel(props: { text: string }) {
  return <span>{props.text}</span>;
}

const componentBoundary = (
  <div>
    <TextLabel text="one" />
    <TextLabel text="two" />
  </div>
);

// A component's props are the host's own. It runs while bundling and consumes
// them there, so they never cross and need not be able to: a class instance and
// a host function are both fine here, where either would be refused in a
// `<div>`'s props.
//
// This is why a drawing's props are `unknown` rather than what a client value
// may be — crossing is a tag's requirement, checked where a tag lowers.
class Palette {
  accent: string;
  constructor(accent: string) {
    this.accent = accent;
  }
}

async function Swatch(props: { palette: Palette; label: () => string }) {
  return <span class={props.palette.accent}>{props.label()}</span>;
}

const componentHostProps = (
  <div>
    <Swatch palette={new Palette("danger")} label={() => "one"} />
  </div>
);

// Invocations nest, and each one is an instance. `Outer` renders `Inner`, which
// renders the `Text`, so there are three entries — and `Outer`'s content is a
// reference to `Inner`'s rather than an element of its own.
//
// A flag on the resolved element couldn't express this: the outer mark would
// overwrite the inner one and both invocations would collapse into a single
// entry, sharing one instance and therefore one lifetime for any state they
// declared.
async function Inner() {
  return <span>x</span>;
}

async function Outer() {
  return <Inner />;
}

const componentNesting = (
  <div>
    <Outer />
  </div>
);

const coreComponents = (
  <div style="padding: 8px">
    <span style="font-size: 12px" onclick={cs`() => {}`}>
      hi
    </span>
    <img src="https://example.com/a.png" />
  </div>
);

// A server component can render nothing. The invocation is still an instance —
// it owns the cells the component declared, and a re-render can give it a child
// later — so it keeps a tree entry of its own, with null content.
async function Absent() {
  return null;
}

const rendersNothing = (
  <div>
    <Absent />
  </div>
);

// A component tag written inside a client script. `Card` is a name no scope in
// the script binds, so it splices as the host binding, and what a splice holds
// that is a function is its expansion: the component run once against one
// opaque hole for the argument it takes, with a field read off that hole
// wherever it read a prop. The tag is a call of it.
//
// Each prop goes as a thunk and the drawing calls it where it reads it, which
// is what keeps a prop a prop: an argument is evaluated once where it is
// passed, and a prop has to be re-read whenever what it names changes.
async function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

async function Badge() {
  return <span>new</span>;
}

const scriptComponent = cs`{
  return (
    <div>
      <Card title="totals" />
      <Badge />
    </div>
  );
}`;

type Person = { readonly firstName: string };

// A component reading two levels deep. The hole is named for the path the
// component read, so `props.person.firstName` is `$0.person.firstName` — and
// only the first step off the parameter is a prop, which the tag hands over as
// a thunk. What that thunk answers with is an ordinary value, so reading a
// field of it is an ordinary read: `$0.person().firstName`.
//
// The cast is the gap this pins. A prop written at a tag inside a script is
// client code, so it types as `Prop<T>` — and a `Prop` may be a script, which
// has no fields to read. The bundler hands the component a hole either way, and
// a hole answers a field with a field of itself, so the read is meaningful
// where the type says it is not.
async function Greeting(props: { readonly person: Prop<Person> }) {
  return <h2>{(props.person as Person).firstName}</h2>;
}

const scriptComponentNestedProp = cs`<Greeting
  person={{ firstName: "ada" }}
/>`;

// A type the host declared, named from inside a script: as a type argument, as
// a parameter annotation, and as what a `let` was said to hold.
//
// Every one of them is the script's own text carried into the virtual code
// unchanged, and every one is mapped to itself. Without that the text is
// swallowed by the mapping around it, whose generated span and source span are
// different lengths — so no position inside reads back, and everything an
// editor answers about a position is answered about nothing. `Row` losing its
// colour is what that looks like; go-to-definition landing nowhere is the same
// bug wearing another hat.
type Row = { id: number; label: string };

async function Rows() {
  return cs`{
    const rows = $state<Row[]>([]);
    const add = (row: Row) => {
      rows.write([row]);
    };
    const label = (row: Row) => {
      return row.label;
    };
    return (
      <div>
        <span onclick={() => add({ id: 1, label: "one" })}>add</span>
        <div>
          <For each={rows.read()}>
            {(row: Row) => <span>{label(row)}</span>}
          </For>
        </div>
      </div>
    );
  }`;
}

// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's opaque
// `EventTarget`, which is what makes reading a field's value sayable — the DOM
// expects a cast there, and this language has none.
const eventHandlers = cs`{
  const said = $state("");

  return (
    <form
      onsubmit={(event) => {
        event.preventDefault();
        said.write(event.type + " " + event.cancelable);
      }}
    >
      <textarea oninput={(event) => said.write(event.currentTarget.value)} />
      <input oninput={(event) => said.write(event.currentTarget.value)} />
      <button
        onclick={(event) =>
          said.write(event.clientX + " " + event.currentTarget.tagName)
        }
      >
        {said.read()}
      </button>
    </form>
  );
}`;

describe("what each case compiles and bundles to", () => {
  it("componentAnswersChildren", async (t) => {
    await snapshotCase(t, "componentAnswersChildren", componentAnswersChildren);
  });

  it("componentAnswersScript", async (t) => {
    await snapshotCase(t, "componentAnswersScript", componentAnswersScript);
  });

  it("componentBoundary", async (t) => {
    await snapshotCase(t, "componentBoundary", componentBoundary);
  });

  it("componentHostProps", async (t) => {
    await snapshotCase(t, "componentHostProps", componentHostProps);
  });

  it("componentNesting", async (t) => {
    await snapshotCase(t, "componentNesting", componentNesting);
  });

  it("coreComponents", async (t) => {
    await snapshotCase(t, "coreComponents", coreComponents);
  });

  it("rendersNothing", async (t) => {
    await snapshotCase(t, "rendersNothing", rendersNothing);
  });

  it("scriptComponent", async (t) => {
    await snapshotCase(t, "scriptComponent", scriptComponent);
  });

  it("scriptComponentNestedProp", async (t) => {
    await snapshotCase(
      t,
      "scriptComponentNestedProp",
      scriptComponentNestedProp,
    );
  });

  it("Rows", async (t) => {
    await snapshotCase(t, "Rows", <Rows />);
  });

  it("eventHandlers", async (t) => {
    await snapshotCase(t, "eventHandlers", eventHandlers);
  });
});
