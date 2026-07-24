const Label = (props: { text?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Label",
  props,
});
const Flexbox = (props: { direction?: string; children?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Flexbox",
  props,
});

const shared = <Label text="hi" />;

// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
export default <Flexbox direction="column">{[shared, shared]}</Flexbox>;
