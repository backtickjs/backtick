# The host build. Native code keeps its own toolchain, so this is a Makefile
# and not part of the pnpm graph — `clang++` and nothing else. Nothing here is
# any one device's: a project bringing its own toolchain compiles the same
# `src/` under that.
#
# There is nothing to link yet. `make` checks that the headers say something a
# compiler accepts, which is the whole of what a file with no methods can be
# wrong about.

CXX ?= c++
CXXFLAGS ?= -std=c++17 -Wall -Wextra -Wpedantic

SOURCES := $(wildcard src/*.cpp)
OBJECTS := $(SOURCES:src/%.cpp=build/%.o)

.PHONY: build clean

build: $(OBJECTS)

build/%.o: src/%.cpp $(wildcard src/*.h)
	@mkdir -p build
	$(CXX) $(CXXFLAGS) -c -o $@ $<

clean:
	rm -rf build
