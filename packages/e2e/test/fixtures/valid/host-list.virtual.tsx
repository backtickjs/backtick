import { cs, state, For, type State } from "@backtickjs/core";

type Row = {
  readonly id: number;
  readonly label: State<string>;
};

// The drawing `script-component` makes, written the other way: the cell is one
// the component declares and the client owns, and `<For />` is a tag the host
// wrote. The pair is there to be read side by side — same rows, same handler,
// same markup — so what differs between the two bundles is where a thing was
// written and nothing else.
//
// Everything the client does still crosses as a script, because that is what a
// prop admits: `each` is one, the child is one, and the handler inside the
// child is one. The difference is that here each of them is a `cs` template the
// source spelled, where in the other the tag's props are expressions the script
// already held and the compiler passes to what the component drew.
async function Rows() {
  const build = cs.lift(cs.const((__cs_from: number) => {
    return cs.const(cs.receiver(Array).from({ length: 3 }, (__cs__, __cs_at) => {
        return cs.const({ id: __cs_from + __cs_at, label: cs.state("row " + (__cs_from + __cs_at)) });
    }));
}));

  const held = state(cs.lift(cs.const(cs.splice((build))(1))));

  return (
    <div>
      <ul class="rows">
        <For each={cs.lift(cs.const(cs.receiver(cs.splice((held))).read()))}>
          {cs.lift(cs.const((__cs_row: Row) => <li onclick={cs.lift(() => cs.receiver(cs.receiver(__cs_row).label).write("pressed"))}>{cs.lift(cs.receiver(cs.receiver(__cs_row).label).read())}</li>))}
        </For>
      </ul>
    </div>
  );
}

export default <Rows />;
