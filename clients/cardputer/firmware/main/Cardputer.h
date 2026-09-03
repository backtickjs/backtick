#pragma once

#include <string>

#include "Interpreter.h"

namespace backtick {

// A key, as the loop hands it to the app: what it says, and the scanner's own
// number for where it sits — which is what a map from one to the other is
// built out of, and what an app naming a key the table has not reads.
struct Press {
  std::string name;
  int code = 0;
};

// What this target answers for beside the language: the names
// `cardputer-schema` declares. `pressed` is where a key waits for the app to
// ask, which the loop owns and this only reads.
void installCardputerBuiltins(Interpreter& into, Press& pressed);

}  // namespace backtick
