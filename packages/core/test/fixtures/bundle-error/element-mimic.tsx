// A plain data object prop whose shape matches an element node (`type`,
// `key`, `props`) would read as a JSX element once rendered; bundling must
// reject the ambiguity.
export default <flexbox data={{ type: "x", key: null, props: {} }} />;
