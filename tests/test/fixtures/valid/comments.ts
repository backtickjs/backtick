import { cs } from "@backtickjs/core";

// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
export default cs`{
  // leading line comment
  const count = 1; // trailing line comment
  /* block comment */
  if (count === 1) {
    // branch comment
    return "one";
  }
  /**
   * doc comment
   */
  return "many";
}`;
