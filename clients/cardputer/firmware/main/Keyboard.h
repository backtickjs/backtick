#pragma once

#include <string>

namespace backtick {

// The Cardputer ADV's keyboard, which is a TCA8418 matrix scanner on the
// internal I²C bus rather than pins this could read itself.
//
// Best effort, and deliberately quiet: an app that never asks for a key should
// not fail to draw because the scanner did not answer. Every call that goes
// wrong reads as "no key", which is also what a device with nobody typing on
// it reports.
void beginKeyboard();

// What was pressed since this was last asked, or an empty string. A printable
// key is itself; the rest are named.
std::string pollKey();

}  // namespace backtick
