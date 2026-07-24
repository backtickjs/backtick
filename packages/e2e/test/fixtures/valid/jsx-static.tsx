const Label = (props: { text?: unknown; key?: string | number }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Label",
  props,
});
const Flexbox = (props: { direction?: string; children?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Flexbox",
  props,
});

// A host-built JSX tree with only static props bundles as pure data: one tree
// entry, an empty function table, and a nested element inlined in place.
export default (
  <Flexbox direction="row">
    <Label text="hi" key="a" />
  </Flexbox>
);
