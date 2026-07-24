const Button = (props: { data?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Button",
  props,
});

// A plain data object that mimics an IR node (`kind`/`target`) stays data:
// the IR carries user data under its own value nodes, so a `kind` key can
// never read as structure.
export default <Button data={{ kind: "IrScriptRef", target: 0 }} />;
