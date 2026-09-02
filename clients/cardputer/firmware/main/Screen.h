#pragma once

#include <M5GFX.h>

#include "Value.h"

namespace backtick {

// Draws what a bundle evaluated to.
//
// One call per element, and the element names are M5GFX's own — `<rect>` is
// `fillRect` and `drawRect`, `<string>` is `drawString`. The schema was written
// against this surface rather than a box model, because a 240×135 panel has no
// layout engine behind it and inventing one here would put the interesting
// decisions in the wrong place.
void paint(M5Canvas& into, const Value& drawing);

}  // namespace backtick
