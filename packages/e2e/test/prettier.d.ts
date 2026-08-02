// Prettier, by the path rather than the name — see `transpileFixture.ts` for
// why. The package exports the path (`./*`) but publishes no types beside it,
// so they are borrowed from the name it does type.
declare module "prettier/index.mjs" {
  export * from "prettier";
  export { default } from "prettier";
}
