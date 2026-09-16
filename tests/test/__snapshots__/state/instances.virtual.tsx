import { cs, state } from "@backtickjs/core";

// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a cell of its own.
async function OwnCounter() {
  return cs.lift((() => {
    const __cs_size = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(16));
    return cs.const(<span style={cs.lift("font-size: " + cs.receiver(__cs_size).read() + "px")} onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_size).write(cs.receiver(__cs_size).read() + 1));
    })}>
        press
      </span>);
})());
}

const instances = (
  <div>
    <OwnCounter />
    <OwnCounter />
  </div>
);
