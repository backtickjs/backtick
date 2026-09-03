#include "Keyboard.h"

#include <M5Unified.h>

namespace backtick {

namespace {

// The scanner, as the board wires it.
constexpr uint8_t kAddress = 0x34;
constexpr uint8_t kRegisterConfig = 0x01;
constexpr uint8_t kRegisterCount = 0x03;
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

// Where a key sits, to what it says. The keyboard is four rows of fourteen and
// the scanner is seven lines of eight, which is the same 56 keys wired the
// other way up: a line carries two keyboard columns, its first four keys one
// column top to bottom and its next four the column beside it.
const char* named(uint8_t number) {
  static const char* const keys[4][14] = {
      {"`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=",
       "backspace"},
      {"tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"},
      {"fn", "shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
       "enter"},
      {"ctrl", "opt", "alt", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
       " "},
  };
  // Numbered from one, ten to a line whatever the line has wired to it — so
  // the eight that are leave a gap of two this never sees a key in.
  const uint8_t at = static_cast<uint8_t>(number - 1);
  const uint8_t line = static_cast<uint8_t>(at / 10);
  const uint8_t along = static_cast<uint8_t>(at % 10);
  if (number == 0 || line >= 7 || along >= 8) {
    return "";
  }
  return keys[along % 4][line * 2 + along / 4];
}

}  // namespace

void beginKeyboard() {
  // Seven lines with eight keys along each, which is the whole keyboard, and
  // then the key interrupt — what fills the queue this reads.
  ready = write(kRegisterRows, 0x7F) &&
          write(kRegisterColumnsLow, 0xFF) &&
          write(kRegisterColumnsHigh, 0x00) &&
          write(kRegisterConfig, 0x01);
}

Press pollKey() {
  if (!ready) {
    return {};
  }
  uint8_t queued = 0;
  // How many events are waiting, rather than whether one ever arrived: the
  // interrupt flag latches until it is written back, and a poll trusting that
  // would read an empty queue for ever after the first key.
  if (!read(kRegisterCount, queued) || (queued & 0x0F) == 0) {
    return {};
  }
  uint8_t event = 0;
  if (!read(kRegisterEvent, event)) {
    return {};
  }
  // The top bit is press against release; only a press is a key.
  if ((event & 0x80) == 0) {
    return {};
  }
  const uint8_t number = static_cast<uint8_t>(event & 0x7F);
  return {named(number), number};
}

}  // namespace backtick
