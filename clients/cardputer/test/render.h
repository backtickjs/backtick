#pragma once

#include <string>

#include "../src/Value.h"

namespace backtick {

// A value as `tests/test/renderValue.ts` writes one. Ported rather than
// invented: the `.value` files are that function's output, so agreeing with it
// character for character is the whole of the test.
std::string renderValue(const Value& of);

}  // namespace backtick
