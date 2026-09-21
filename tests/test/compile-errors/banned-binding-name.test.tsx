import { cs } from "@backtickjs/core";

// Strict mode's names, refused where a script binds one. `undefined` has its
// own test.
const declared = cs`{
  const eval = 1;
  const arguments = 1;
  const let = 1;
  const static = 1;
  const yield = 1;
  const implements = 1;
  const interface = 1;
  const package = 1;
  const private = 1;
  const protected = 1;
  const public = 1;
  const await = 1;
  return 0;
}`;

const parameter = cs`(
  eval: number,
  arguments: number,
  let: number,
  static: number,
  yield: number,
  implements: number,
  interface: number,
  package: number,
  private: number,
  protected: number,
  public: number,
  await: number,
) => 0`;

const caught = cs`{
  try {
    const a = 1;
  } catch (eval) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (arguments) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (let) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (static) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (yield) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (implements) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (interface) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (package) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (private) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (protected) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (public) {
    const b = 2;
  }
  try {
    const a = 1;
  } catch (await) {
    const b = 2;
  }
  return 0;
}`;
