import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";

// A host function splices only if it takes and answers with scripts (see
// `Spliceable`); one taking props is named by a tag, as a component.
function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

export default cs`{
  // @ts-expect-error: Type '(props: { readonly title: Prop<string>; }) => Element' does not satisfy the expected type 'Spliceable'.
  const Heading = $Card;
  return <Card title="tag" />;
}`;
