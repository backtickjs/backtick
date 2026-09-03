#include <fstream>
#include <iostream>
#include <sstream>

#include "../src/Builtins.h"
#include "../src/Interpreter.h"
#include "../src/Json.h"
#include "render.h"

using namespace backtick;

// One bundle, evaluated and written out — an app seen without a device in the
// loop. What it prints is the drawing the client would paint, in the same
// markup the fixtures record, so a change to an app is a diff rather than a
// flash cycle.
//
// The names only a device answers for are stood in for here: a screen of the
// right size, a clock, and nothing pressed.
int main(int argc, char** argv) {
  if (argc < 2) {
    std::cerr << "usage: preview <bundle.json>\n";
    return 2;
  }
  std::ifstream file(argv[1], std::ios::binary);
  if (!file) {
    std::cerr << "cannot read " << argv[1] << "\n";
    return 2;
  }
  std::ostringstream held;
  held << file.rdbuf();

  Json json;
  if (!json.parse(held.str())) {
    std::cerr << "bad bundle: " << json.error() << "\n";
    return 1;
  }

  Interpreter machine;
  installLanguageBuiltins(machine);

  auto stub = [&machine](const char* name, Value answer) {
    auto held = std::make_shared<Closure>();
    held->name = name;
    held->native = [answer](std::vector<Value>&) { return answer; };
    machine.builtins[name] = Value::function(held);
  };
  stub("screenWidth", Value::number(240));
  stub("screenHeight", Value::number(135));
  stub("millis", Value::number(0));
  stub("battery", Value::number(100));
  stub("key", Value::string(argc > 2 ? argv[2] : ""));
  // A preview is given a key by name, so there is no number under it to
  // report — 1 stands for "something was pressed", which is what an app
  // reading this branches on.
  stub("keyCode", Value::number(argc > 2 && argv[2][0] != '\0' ? 1 : 0));
  {
    auto held = std::make_shared<Closure>();
    held->name = "textWidth";
    held->native = [](std::vector<Value>& args) {
      // Six pixels a character at size one, which is this font's width. Near
      // enough for a preview, and the device measures it properly.
      const size_t length =
          args.empty() || args[0].kind() != Kind::String ? 0 : args[0].string().size();
      const double size =
          args.size() > 1 && args[1].kind() == Kind::Number ? args[1].number() : 1;
      return Value::number(static_cast<double>(length) * 6 * size);
    };
    machine.builtins["textWidth"] = Value::function(held);
  }

  try {
    std::cout << renderValue(machine.run(json)) << "\n";
  } catch (Thrown& thrown) {
    std::cerr << "this app threw: " << renderValue(thrown.value) << "\n";
    return 1;
  } catch (const std::exception& e) {
    std::cerr << "error: " << e.what() << "\n";
    return 1;
  }
  return 0;
}
