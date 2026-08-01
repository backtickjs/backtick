// Solid, by the path rather than the name. Node resolves a bare `solid-js` to
// the server build, where a computation runs once and a write does nothing at
// all — reactivity that is inert without ever saying so, which is a test suite
// passing on values that never moved. This interpreter runs under Node as often
// as in a browser, so every import names the reactive build outright.
//
// The package exports the path (`./dist/*`) but publishes no types beside it,
// so they are borrowed from the name it does type.
declare module "solid-js/dist/solid.js" {
  export * from "solid-js";
}
