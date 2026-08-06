import { cs, Text, View } from "@backtickjs/core";

// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs.lift(cs.const((__cs_name: string) => <><Text>a sentence across lines</Text><Text>{__cs_name} {__cs_name}</Text></>));

export default <View>{cs.lift(cs.const(cs.splice((listed))("x")))}</View>;
