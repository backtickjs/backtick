#include <dirent.h>

#include <algorithm>
#include <cstring>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

#include "../src/Builtins.h"
#include "../src/Interpreter.h"
#include "../src/Json.h"
#include "render.h"

using namespace backtick;

// The fixture suite, run against this interpreter.
//
// Every `valid/` fixture is a `.bundle` this evaluates and a `.value` holding
// what the reference client produced. Agreeing with that file is what working
// means: there is no separate expectation written here to drift from it.
//
// Fixtures whose value is a drawing are skipped while this client draws
// nothing — they are the other half of the port, not a failure of this one.

static bool read(const std::string& path, std::string& into) {
  std::ifstream file(path, std::ios::binary);
  if (!file) return false;
  std::ostringstream held;
  held << file.rdbuf();
  into = held.str();
  return true;
}

static std::string trimEnd(std::string of) {
  while (!of.empty() && (of.back() == '\n' || of.back() == '\r')) of.pop_back();
  return of;
}

static bool drawsSomething(const std::string& value) {
  // A rendered drawing is a tag, and one can sit anywhere inside a value — a
  // list of them is still a list. Any line opening with `<` is markup, which
  // no rendered value produces otherwise.
  size_t at = 0;
  while (at < value.size()) {
    size_t end = value.find('\n', at);
    if (end == std::string::npos) end = value.size();
    size_t first = value.find_first_not_of(" \t\r", at);
    if (first != std::string::npos && first < end && value[first] == '<') {
      return true;
    }
    at = end + 1;
  }
  return false;
}

int main(int argc, char** argv) {
  const std::string dir =
      argc > 1 ? argv[1] : "../../tests/test/fixtures/valid";

  std::vector<std::string> names;
  DIR* open = opendir(dir.c_str());
  if (open == nullptr) {
    std::cerr << "cannot read " << dir << "\n";
    return 2;
  }
  while (dirent* held = readdir(open)) {
    std::string name = held->d_name;
    const std::string suffix = ".bundle";
    if (name.size() > suffix.size() &&
        name.compare(name.size() - suffix.size(), suffix.size(), suffix) == 0) {
      names.push_back(name.substr(0, name.size() - suffix.size()));
    }
  }
  closedir(open);
  std::sort(names.begin(), names.end());

  int passed = 0;
  int failed = 0;
  int drawing = 0;
  (void)drawing;
  std::vector<std::string> failures;

  const bool verbose = argc > 2 && std::strcmp(argv[2], "-v") == 0;

  for (const std::string& name : names) {
    std::string bundleText;
    std::string expected;
    if (!read(dir + "/" + name + ".bundle", bundleText)) continue;
    if (!read(dir + "/" + name + ".value", expected)) continue;
    expected = trimEnd(expected);

    std::string got;
    try {
      Json json;
      if (!json.parse(bundleText)) {
        got = "[parse error: " + json.error() + "]";
      } else {
        Interpreter machine;
        installLanguageBuiltins(machine);
        got = renderValue(machine.run(json));
      }
    } catch (Thrown& thrown) {
      got = "[uncaught: " + renderValue(thrown.value) + "]";
    } catch (const std::exception& e) {
      got = std::string("[error: ") + e.what() + "]";
    }

    if (got == expected) {
      passed++;
      if (verbose) std::cout << "  ok   " << name << "\n";
    } else {
      failed++;
      failures.push_back(name);
      if (verbose) {
        std::cout << "  FAIL " << name << "\n";
        std::cout << "       expected: " << expected << "\n";
        std::cout << "       got:      " << got << "\n";
      }
    }
  }

  std::cout << "\n" << passed << " passed, " << failed << " failed, " << drawing
            << " skipped (they draw)\n";
  if (!failures.empty() && !verbose) {
    std::cout << "failing: ";
    for (size_t i = 0; i < failures.size() && i < 12; i++) {
      std::cout << failures[i] << (i + 1 < failures.size() ? " " : "");
    }
    if (failures.size() > 12) std::cout << "… and " << (failures.size() - 12) << " more";
    std::cout << "\n";
  }
  return failed == 0 ? 0 : 1;
}
