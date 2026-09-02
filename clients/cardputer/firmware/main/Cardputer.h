#pragma once

#include <string>

#include "Interpreter.h"

namespace backtick {

// What this target answers for beside the language: the names
// `cardputer-schema` declares. `pending` is where a key waits for the app to
// ask, which the loop owns and this only reads.
void installCardputerBuiltins(Interpreter& into, std::string& pending);

}  // namespace backtick
