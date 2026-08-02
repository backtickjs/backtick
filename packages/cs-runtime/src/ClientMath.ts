/**
 * The client `Math` API: what a script may reach on the one global this
 * language has. Curated from the standard library, and curated harder than the
 * rest of it, because a bundle is read by hosts that are not JavaScript and
 * every member here has to mean the same thing on all of them.
 *
 * What that rules out is most of `Math`. IEEE 754 fixes the result of `sqrt`
 * and of the roundings, but says nothing about `sin`, `cos`, `tan`, `exp`,
 * `log`, `pow` or `atan2` — two conforming implementations may differ in the
 * last place, and V8 has changed its own answers between versions. A format
 * specified against a reference client cannot promise "whatever JavaScript
 * did", so those are absent rather than approximately right.
 *
 * `random` is the exception, and it is here deliberately. Every other member
 * answers the same on every host and on every run; this one answers
 * differently each time it is called, so a bundle that reaches it draws
 * something new on each read and cannot be compared against itself. It is
 * admitted because the alternative is that no script can be random at all, and
 * a seeded generator — which would keep its seed in the bundle, and would be
 * reproducible — is not written yet.
 */
export interface ClientMath {
  /** The ratio of the circumference of a circle to its diameter. */
  readonly PI: number;

  /** Euler's number, the base of the natural logarithms. */
  readonly E: number;

  /** Returns the absolute value of a number. */
  abs(x: number): number;

  /**
   * Returns a pseudorandom number between 0 (inclusive) and 1 (exclusive).
   *
   * The one member here that is not a function of its arguments. Two calls
   * disagree, two hosts disagree, and two runs of the same bundle disagree —
   * so a bundle that reaches this cannot be snapshotted, cached by its output,
   * or compared against a previous run of itself.
   */
  random(): number;

  /** Returns the sign of a number, indicating whether it is positive (1), negative (-1) or zero (0). */
  sign(x: number): number;

  /** Returns the greatest integer less than or equal to its numeric argument. */
  floor(x: number): number;

  /** Returns the smallest integer greater than or equal to its numeric argument. */
  ceil(x: number): number;

  /**
   * Returns a number rounded to the nearest integer.
   *
   * Ties round **up**, towards positive infinity, which is JavaScript's rule
   * rather than the one most languages use: `round(-0.5)` is `-0` and not
   * `-1`, and `round(2.5)` is `3` while `round(-2.5)` is `-2`. Written down
   * here because a host that rounds half-to-even would disagree with every
   * bundle that used this.
   */
  round(x: number): number;

  /** Returns the integer part of a number by removing any fractional digits. */
  trunc(x: number): number;

  /**
   * Returns the smaller of its arguments.
   *
   * At least one is required, where the standard library takes none and
   * answers `Infinity` — an empty answer that isn't this language's one absent
   * value, and so not an answer it should be able to produce.
   */
  min(first: number, ...rest: number[]): number;

  /**
   * Returns the larger of its arguments.
   *
   * At least one is required, for the reason `min` gives.
   */
  max(first: number, ...rest: number[]): number;

  /** Returns the square root of a number. Correctly rounded, which IEEE 754 requires of it and of nothing else here. */
  sqrt(x: number): number;

  /** Returns the nearest single precision float representation of a number. */
  fround(x: number): number;
}
