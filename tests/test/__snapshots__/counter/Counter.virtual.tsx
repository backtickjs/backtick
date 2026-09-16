import { cs, state } from "@backtickjs/core";

// A cell a script declares, and a button that writes it.
async function Counter() {
  return cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>Add</button>)}{cs.lift(<p>{cs.lift("Count: " + cs.receiver(__cs_count).read())}</p>)}</div>);
})());
}
