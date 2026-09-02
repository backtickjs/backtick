# The host build. Native code keeps its own toolchain, so this is a Makefile
# and not part of the pnpm graph — `clang++` and nothing else.
#
# The device build is ESP-IDF's, under `firmware/`, and compiles the same `src/`.

CXX ?= c++
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wno-unused-parameter
FIXTURES ?= ../../tests/test/fixtures/valid

SOURCES := src/Json.cpp src/Value.cpp src/Interpreter.cpp src/Builtins.cpp
TESTS := test/main.cpp test/render.cpp

.PHONY: test build preview flash headless clean

test: build
	@build/fixtures $(FIXTURES)

build: build/fixtures build/preview

# An app's drawing, without a device. `make preview` after `pnpm build` in
# `app/` shows what the screen would show.
preview: build/preview
	@build/preview firmware/main/bundle.json "$(ARGS)"

build/preview: $(SOURCES) test/preview.cpp test/render.cpp $(wildcard src/*.h)
	@mkdir -p build
	$(CXX) $(CXXFLAGS) -o $@ $(SOURCES) test/preview.cpp test/render.cpp

build/fixtures: $(SOURCES) $(TESTS) $(wildcard src/*.h) $(wildcard test/*.h)
	@mkdir -p build
	$(CXX) $(CXXFLAGS) -o $@ $(SOURCES) $(TESTS)

clean:
	rm -rf build

# The device. Builds the app, the firmware around it, and writes it — plug the
# Cardputer in first. `make flash PORT=/dev/cu.usbmodem1101` where it needs
# telling which one.
flash:
	@./flash.sh $(PORT)

# The same client on an emulated chip, with the drawing printed rather than
# painted. What QEMU can run: it has no panel, no I2C and no ADC, so the build
# it runs links no M5 at all.
headless:
	@cd firmware && BACKTICK_HEADLESS=1 idf.py build && BACKTICK_HEADLESS=1 idf.py qemu
