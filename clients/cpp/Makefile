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
HEADERS := $(wildcard src/*.h)
OBJECTS := $(SOURCES:src/%.cpp=build/%.o)

.PHONY: build headers clean

build: headers $(OBJECTS)

# A generated header nothing includes yet is still a header that has to compile.
headers:
	@for header in $(HEADERS); do echo "#include \"$$header\""; done \
	  | $(CXX) $(CXXFLAGS) -fsyntax-only -x c++ -I. -

build/%.o: src/%.cpp $(wildcard src/*.h)
	@mkdir -p build
	$(CXX) $(CXXFLAGS) -c -o $@ $<

clean:
	rm -rf build
