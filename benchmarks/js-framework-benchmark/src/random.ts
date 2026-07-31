// A seeded generator, so the pool this app draws from and the rows the vendored
// vanillajs builds are the same rows. Both reach it through the benchmark's own
// `Math.round(Math.random() * 1000) % max`, and both draw three times per row in
// the same order, so an identical stream means identical labels — and any
// difference the verifier reports is a difference in what an operation *did*.
export const SEED = 20260730;

// mulberry32: small, and the exact algorithm doesn't matter — only that both
// sides run the same one from the same seed.
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let drawn = Math.imul(state ^ (state >>> 15), 1 | state);
    drawn = (drawn + Math.imul(drawn ^ (drawn >>> 7), 61 | drawn)) ^ drawn;
    return ((drawn ^ (drawn >>> 14)) >>> 0) / 4294967296;
  };
}
