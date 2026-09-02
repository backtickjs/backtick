#pragma once

#include <string>

#include "Value.h"

namespace backtick {

// A drawing as text, for a build with no panel to put it on.
std::string show(const Value& of);

}  // namespace backtick
