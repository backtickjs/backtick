#pragma once

#include <string_view>

#include "Value.h"

namespace backtick {

// What a bundle's root evaluates to. Answers `null` until there is a reader.
Value evaluate(std::string_view bundle);

}  // namespace backtick
