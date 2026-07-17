// A host function has no data form: it can't cross into the client as a prop
// value, so bundling must fail loudly.
export default <button data={() => null} />;
