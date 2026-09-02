#include "Keyboard.h"

#include <M5Unified.h>

namespace backtick {

namespace {

// The scanner, as the board wires it.
constexpr uint8_t kAddress = 0x34;
constexpr uint8_t kRegisterConfig = 0x01;
constexpr uint8_t kRegisterStatus = 0x02;
constexpr uint8_t kRegisterEvent = 0x04;
constexpr uint8_t kRegisterRows = 0x1D;
constexpr uint8_t kRegisterColumnsLow = 0x1E;
constexpr uint8_t kRegisterColumnsHigh = 0x1F;

bool ready = false;

bool write(uint8_t at, uint8_t value) {
  return M5.In_I2C.writeRegister8(kAddress, at, value, 400000);
}

bool read(uint8_t at, uint8_t& into) {
  return M5.In_I2C.readRegister(kAddress, at, &into, 1, 400000);
}

// Where a key sits in the matrix, to what it says. Four rows of fourteen, and
// only what an app is likely to want: the rest read as an empty string, which
// an app treats the same as nothing pressed.
const char* named(uint8_t row, uint8_t column) {
  static const char* const rows[4][14] = {
      {"`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
       "backspace"},
      {"tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"},
      {"shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
       ""},
      {"ctrl", "opt", "alt", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
       " "},
  };
  if (row >= 4 || column >= 14) {
    return "";
  }
  return rows[row][column];
}

}  // namespace

void beginKeyboard() {
  // Rows 0–3 and columns 0–13 into the matrix, then the scanner on.
  ready = write(kRegisterRows, 0x0F) &&
          write(kRegisterColumnsLow, 0xFF) &&
          write(kRegisterColumnsHigh, 0x3F) &&
          write(kRegisterConfig, 0x01);
}

std::string pollKey() {
  if (!ready) {
    return "";
  }
  uint8_t status = 0;
  if (!read(kRegisterStatus, status) || (status & 0x1F) == 0) {
    return "";
  }
  uint8_t event = 0;
  if (!read(kRegisterEvent, event)) {
    return "";
  }
  // The top bit is press against release; only a press is a key.
  if ((event & 0x80) == 0) {
    return "";
  }
  const uint8_t at = static_cast<uint8_t>((event & 0x7F) - 1);
  return named(static_cast<uint8_t>(at / 10), static_cast<uint8_t>(at % 10));
}

}  // namespace backtick
