// A plain data object prop can't use a key the wire format reserves for its
// tagged forms; bundling must fail loudly rather than ship ambiguous JSON.
export default <flexbox data={{ "#call": "#f0" }} />;
