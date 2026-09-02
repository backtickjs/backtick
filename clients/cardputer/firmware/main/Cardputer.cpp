#include "Cardputer.h"

// The headless build links no M5 at all: its global constructor reaches for a
// panel and an I2C bus before `app_main` is called, and an emulator has
// neither. So this answers for the same names with a screen that is only a
// size and a clock that is only a counter.
#ifndef BACKTICK_HEADLESS
#include <M5Unified.h>
#else
#include <esp_timer.h>
#endif

namespace backtick {

namespace {

Value native(const char* name, Native of) {
  auto held = std::make_shared<Closure>();
  held->native = std::move(of);
  held->name = name;
  return Value::function(held);
}

}  // namespace

void installCardputerBuiltins(Interpreter& into, std::string& pending) {
#ifdef BACKTICK_HEADLESS
  into.builtins["screenWidth"] = native("screenWidth", [](std::vector<Value>&) {
    return Value::number(240);
  });
  into.builtins["screenHeight"] = native("screenHeight", [](std::vector<Value>&) {
    return Value::number(135);
  });
  into.builtins["millis"] = native("millis", [](std::vector<Value>&) {
    return Value::number(static_cast<double>(esp_timer_get_time() / 1000));
  });
  into.builtins["battery"] = native("battery", [](std::vector<Value>&) {
    return Value::number(100);
  });
  into.builtins["textWidth"] = native("textWidth", [](std::vector<Value>& args) {
    const size_t length =
        args.empty() || args[0].kind() != Kind::String ? 0 : args[0].string().size();
    const double size =
        args.size() > 1 && args[1].kind() == Kind::Number ? args[1].number() : 1;
    return Value::number(static_cast<double>(length) * 6 * size);
  });
#else
  into.builtins["screenWidth"] = native("screenWidth", [](std::vector<Value>&) {
    return Value::number(static_cast<double>(M5.Display.width()));
  });
  into.builtins["screenHeight"] = native("screenHeight", [](std::vector<Value>&) {
    return Value::number(static_cast<double>(M5.Display.height()));
  });
  into.builtins["millis"] = native("millis", [](std::vector<Value>&) {
    return Value::number(static_cast<double>(lgfx::v1::millis()));
  });
  into.builtins["battery"] = native("battery", [](std::vector<Value>&) {
    return Value::number(static_cast<double>(M5.Power.getBatteryLevel()));
  });
  into.builtins["textWidth"] = native("textWidth", [](std::vector<Value>& args) {
    const std::string text =
        args.empty() || args[0].kind() != Kind::String ? "" : args[0].string();
    M5.Display.setTextSize(args.size() > 1 && args[1].kind() == Kind::Number
                               ? static_cast<float>(args[1].number())
                               : 1.0f);
    return Value::number(static_cast<double>(M5.Display.textWidth(text.c_str())));
  });
#endif
  into.builtins["key"] = native("key", [&pending](std::vector<Value>&) {
    // Read once. An app asking twice in one drawing gets the key and then
    // nothing, which is what "since you last asked" means.
    std::string held = pending;
    pending.clear();
    return Value::string(held);
  });
}

}  // namespace backtick
