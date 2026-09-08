import { For, cs, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";

// The same claim as `backtick-builds-once`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answer = ["one", "two"];

async function Waiting({ more }: { more: Prop<() => boolean> }) {
  return cs.lift((() => {
    const __cs_items = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)<string[]>([]));
    const __cs_started = cs.const(cs.receiver(setTimeout)(() => {
        if ((cs.condition((cs.splice((more)) satisfies import("@backtickjs/core").ClientUnknown)()) && (cs.splice((more)) satisfies import("@backtickjs/core").ClientUnknown)())) {
            cs.statement(cs.receiver(__cs_items).write(cs.splice((answer)) satisfies import("@backtickjs/core").ClientUnknown));
        }
    }, 0));
    return cs.const(<For each={cs.lift(cs.receiver(__cs_items).read())}>{cs.lift((__cs_item: string) => <em>{cs.lift(__cs_item)}</em>)}</For>);
})());
}

export default cs.lift((() => {
    const __cs_asked = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<span>{cs.lift("asked " + cs.receiver(__cs_asked).read())}</span>)}{cs.lift(<Waiting more={cs.lift(() => {
        cs.statement(cs.receiver(__cs_asked).write(cs.receiver(__cs_asked).read() + 1));
        return cs.const(cs.receiver(__cs_asked).read() < 5);
    })}/>)}</div>);
})());
