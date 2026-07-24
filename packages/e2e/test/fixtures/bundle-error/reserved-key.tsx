const Button = (props: { data?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Button",
  props,
});

// `#` is the bundle's one reserved key — the discriminant of every node — so
// a plain data object can't carry it.
export default <Button data={{ "#": "value" }} />;
