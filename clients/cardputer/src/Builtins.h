#pragma once

#include "Interpreter.h"

namespace backtick {

// The names `language-schema` declares, which every client answers for
// whatever it draws with. A target adds its own beside these and may not
// replace one: what `Math.floor` means is not a target's to redecide.
void installLanguageBuiltins(Interpreter& into);

// Storage, as `state` hands it over. Held here rather than in the interpreter
// because what a cell is for — something watching it — is the renderer's, and
// the language only needs it to hold and hand back.
struct Cell {
  Value value;
};

}  // namespace backtick
