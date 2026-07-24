const Button = (props: { data?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Button",
  props,
});

// With elements carried as a `#` form, a plain data object shaped like
// one (`type`/`key`/`props`) is unambiguous and ships as data.
export default <Button data={{ type: "x", key: null, props: {} }} />;
