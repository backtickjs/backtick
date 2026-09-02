// Two builds from one file. The device's paints; the headless one prints what
// it would have painted, and is the only one an emulator can run — QEMU has no
// panel, no I2C and no ADC, so `M5.begin` never returns there. What that buys
// is the whole client checked on the actual chip bar the pixels.
#ifndef BACKTICK_HEADLESS
#include <M5Unified.h>
#endif
#include <esp_heap_caps.h>
#include <stdio.h>

#include <string>

#include "Builtins.h"
#include "Cardputer.h"
#include "Interpreter.h"
#include "Json.h"
#ifndef BACKTICK_HEADLESS
#include "Keyboard.h"
#include "Screen.h"
#endif
#include "Show.h"

// The bundle, linked in beside the firmware and read from flash. The parser
// copies out the strings it needs and nothing else, so the text is never
// resident twice.
extern const char bundleStart[] asm("_binary_bundle_json_start");
extern const char bundleEnd[] asm("_binary_bundle_json_end");

using namespace backtick;

namespace {

Json document;
Interpreter machine;

// What was pressed, waiting for the app to ask. Held for exactly one drawing:
// an app reads it while working out what to draw, and the next drawing sees
// nothing pressed unless something else was.
std::string pending;

#ifndef BACKTICK_HEADLESS
M5Canvas frame(&M5.Display);

// Drawn onto a canvas and pushed in one go, so a frame never half-appears.
void drawOnce() {
  machine.restart();
  frame.fillSprite(TFT_BLACK);
  try {
    paint(frame, machine.run(document));
  } catch (Thrown&) {
    frame.setTextSize(1);
    frame.setTextColor(TFT_RED);
    frame.setTextDatum(top_left);
    frame.drawString("this app threw", 4, 4);
  } catch (const std::exception& e) {
    // What the app got wrong, on the screen rather than only on a wire nobody
    // is watching. A device with one output should say what happened on it.
    frame.setTextSize(1);
    frame.setTextColor(TFT_RED);
    frame.setTextDatum(top_left);
    frame.drawString(e.what(), 4, 4);
  }
  frame.pushSprite(0, 0);
}
#endif

}  // namespace

extern "C" void app_main(void) {
#ifndef BACKTICK_HEADLESS
  auto options = M5.config();
  M5.begin(options);
  M5.Display.setRotation(1);
  M5.Display.fillScreen(TFT_BLACK);
#endif

  size_t length = static_cast<size_t>(bundleEnd - bundleStart);
  while (length > 0 && bundleStart[length - 1] == '\0') {
    length--;
  }

  if (!document.parse(std::string_view(bundleStart, length))) {
    printf("backtick: %s\n", document.error().c_str());
    return;
  }

  installLanguageBuiltins(machine);
  installCardputerBuiltins(machine, pending);

  printf("backtick: a bundle of %u bytes, %u bytes free\n",
         static_cast<unsigned>(length),
         static_cast<unsigned>(heap_caps_get_free_size(MALLOC_CAP_8BIT)));

#ifdef BACKTICK_HEADLESS
  // Three drawings, so what is checked is not only that one comes out but that
  // a key reaches the app and what it holds survives into the next one.
  const char* const presses[] = {"", ";", ";"};
  for (const char* press : presses) {
    pending = press;
    machine.restart();
    try {
      printf("backtick: key %-3s -> %s\n", press[0] == 0 ? "-" : press,
             show(machine.run(document)).c_str());
    } catch (const std::exception& e) {
      printf("backtick: %s\n", e.what());
    }
  }
  printf("backtick: %u bytes free after\n",
         static_cast<unsigned>(heap_caps_get_free_size(MALLOC_CAP_8BIT)));
#else
  beginKeyboard();
  frame.setColorDepth(16);
  frame.createSprite(M5.Display.width(), M5.Display.height());

  unsigned long drawn = static_cast<unsigned long>(-1);
  while (true) {
    M5.update();
    const std::string key = pollKey();
    if (!key.empty()) {
      pending = key;
      // A key is a reason to draw again: what an app makes of one it makes
      // while working out its next drawing.
      machine.generation++;
    }
    // Drawn when something moved, and otherwise not at all — a still screen
    // costs nothing, which is what a battery wants.
    if (machine.generation != drawn) {
      drawn = machine.generation;
      drawOnce();
      pending.clear();
    }
    vTaskDelay(pdMS_TO_TICKS(16));
  }
#endif
}
