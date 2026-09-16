import { describe, it } from "node:test";
import { type Client, cs, For, state } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-sdk";
import { snapshotCase } from "./snapshotCase.ts";

// Trees: static JSX, fragments, shared subtrees, lists mapped on the host or
// the client, and elements a script writes.

// `<>…</>` and `<Fragment>` are one component: the JSX transform imports
// `Fragment` from the configured `jsxImportSource`, and the jsx-runtime
// re-exports the core component under that name. The shorthand needs no import.
const fragmentShorthand = (
  <div>
    <>
      <span>a</span>
      <span>b</span>
    </>
  </div>
);

// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n: number): Client<() => number> {
  return cs`() => $n`;
}

const jsxPolymorphicProp = (
  <div>
    <span onclick={make(1)} />
    <span onclick={make(2)} />
  </div>
);

const shared = <span>hi</span>;

// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
const jsxSharedSubtree = <div>{[shared, shared]}</div>;

// A host-built JSX tree with only static props bundles as pure data: one tree
// entry, an empty function table, and a nested element inlined in place.
const jsxStatic = (
  <div>
    <span>hi</span>
  </div>
);

type Item = { sku: string; qty: number };
type Order = {
  id: string;
  customer: { name: string; city: string };
  items: Item[];
  total: number;
};

const orders = Array.from({ length: 5 }, (_, i) => ({
  id: `ord-${1000 + i}`,
  customer: {
    name: `Customer ${i}`,
    city: i % 2 === 0 ? "Montréal" : "Toronto",
  },
  items: [
    { sku: `SKU-${i}-A`, qty: (i % 3) + 1 },
    { sku: `SKU-${i}-B`, qty: 1 },
  ],
  total: 45.23 + i,
}));

// The dataset ships once and the list expands on the client: one card template
// with holes for each order's fields (and a nested item list), mapped at
// runtime. The bundle carries the data plus a single card, not five expanded
// copies. The root View stays static; only its children map on the client.
const largeData = (
  <div>
    <For each={cs`$orders`}>
      {cs`(order: Order) =>
        ${(
          <div>
            <img
              src={cs`"https://img.example.com/" + order.id + ".png"`}
              alt=""
            />
            <span>{cs`order.customer.name`}</span>
            <span>{cs`order.customer.city`}</span>
            <For each={cs`order.items`}>
              {cs`(item: Item) =>
                ${(<span>{cs`item.sku + " x" + item.qty`}</span>)}`}
            </For>
            <span>{cs`"$" + order.total`}</span>
          </div>
        )}`}
    </For>
  </div>
);

// One element template, expanded once per row on the client: the splice hole
// sits inside a `.map` callback, so it is reached once per iteration and each
// expansion must see its own `row`.
//
// The template is written inside the script because that is what lets `row`
// resolve to the callback's binding — hoisting it out would make `row` a free
// host reference instead of a capture.
//
// Inlining is what keeps the expansions apart today: the splice lands in body
// position, where a tree reference is a plain call and instantiates afresh. If
// it ever arrives as a thunk instead, the reference becomes an `apply` in tree
// position, and those memoize one instance per node — one instance shared by
// every row, each overwriting the last. The three values below are what tells
// the two apart.
const rows = [1, 2, 3];

const mappedComponent = (
  <div>
    <For each={cs`$rows`}>
      {cs`(row: number) => ${(<span>{cs`"row " + row`}</span>)}`}
    </For>
  </div>
);

const componentLabels = ["alpha", "beta", "gamma"];

async function Row({ label }: { label: string }) {
  return <span>{label}</span>;
}

// The same list, but each item is a component invocation rather than an
// element. Every invocation is an instance, so each gets a tree entry of its
// own and the key rides the `#apply` that instantiates it — the contrast with
// `mappedElements`, where the key sits inside an inlined element instead.
const mappedComponents = (
  <div>
    {componentLabels.map((item) => (
      <Row label={item} />
    ))}
  </div>
);

const elementLabels = ["alpha", "beta", "gamma"];

// A list mapped on the host. The array is host data, so the map runs while
// bundling and each item becomes its own element — the list's length is fixed
// in the bundle. `largeData` is the other shape, where a `cs` script maps
// on the client and the bundle carries one template plus the data.
//
// Each element is referenced once, so none hoists: they inline into the
// `View`'s entry, each carrying its own key inside the element node.
const mappedElements = (
  <div>
    {elementLabels.map((item) => (
      <span>{item}</span>
    ))}
  </div>
);

// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs`{
    const label = $state("hi");

    // A handler written inline and one held under a name: both are client code,
    // and a handler prop takes a function and nothing else.
    const row = (size: number) => {
      const css = "font-size: " + size + "px";
      const press = () => label.write("held");
      return (
        <div style={css}>
          <span style={css} onclick={() => label.write("pressed")}>
            {label.read()}
          </span>
          <span style="font-size: 8px">fixed</span>
          <span style={css} onclick={press}>
            held
          </span>
        </div>
      );
    };

    return <div style="padding: 0">{row(12)}</div>;
  }`;
}

// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs`(name: string) => (
  <>
    <span>a sentence across lines</span>
    <span>
      {name} {name}
    </span>
  </>
)`;

const scriptFragment = <div>{cs`$listed("x")`}</div>;

// `<Fragment>` written out inside a script, where `<>` is the shorthand. A
// fragment is a component — it answers with its children — so a tag naming one
// splices it and is a call of it, like any other component tag.
//
// The shorthand is not: the compiler reads an absent opening tag as a fragment
// and lowers it to its children, so nothing of it reaches the host at all.
const scriptFragmentTag = cs`{
  return (
    <div>
      {
        <Fragment>
          <span>a</span>
          <span>b</span>
        </Fragment>
      }
      {
        <>
          <em>c</em>
        </>
      }
    </div>
  );
}`;

// A tree spliced into a body and bound to a name before it is used. Nothing
// applies it at the hole and nothing draws it there — it is a value, held and
// handed back, and the position that receives it is what draws it.
//
// The shape this pins is that an entry reached from a body is *applied*: the
// value says which entry and what to hand it, and that is the whole of what an
// instance-to-be is. There was once a second way to say it — naming the entry,
// and calling what that named — and this is the case it existed for.
const HeldRow = async () => <span>x</span>;

const heldElement = cs`() => {
  const tree = ${(<div />)};
  return tree;
}`;

const heldComponent = cs`() => {
  const tree = ${(<HeldRow />)};
  return tree;
}`;

const treeInVariable = (
  <div>
    {cs`$heldElement()`}
    {cs`$heldComponent()`}
  </div>
);

describe("what each case compiles and bundles to", () => {
  it("fragmentShorthand", async (t) => {
    await snapshotCase(t, "fragmentShorthand", fragmentShorthand);
  });

  it("jsxPolymorphicProp", async (t) => {
    await snapshotCase(t, "jsxPolymorphicProp", jsxPolymorphicProp);
  });

  it("jsxSharedSubtree", async (t) => {
    await snapshotCase(t, "jsxSharedSubtree", jsxSharedSubtree);
  });

  it("jsxStatic", async (t) => {
    await snapshotCase(t, "jsxStatic", jsxStatic);
  });

  it("largeData", async (t) => {
    await snapshotCase(t, "largeData", largeData);
  });

  it("mappedComponent", async (t) => {
    await snapshotCase(t, "mappedComponent", mappedComponent);
  });

  it("mappedComponents", async (t) => {
    await snapshotCase(t, "mappedComponents", mappedComponents);
  });

  it("mappedElements", async (t) => {
    await snapshotCase(t, "mappedElements", mappedElements);
  });

  it("Card", async (t) => {
    await snapshotCase(t, "Card", <Card />);
  });

  it("scriptFragment", async (t) => {
    await snapshotCase(t, "scriptFragment", scriptFragment);
  });

  it("scriptFragmentTag", async (t) => {
    await snapshotCase(t, "scriptFragmentTag", scriptFragmentTag);
  });

  it("treeInVariable", async (t) => {
    await snapshotCase(t, "treeInVariable", treeInVariable);
  });
});
