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

HEADERS := $(wildcard src/*.h)

.PHONY: build clean

build:
	@for header in $(HEADERS); do echo "#include \"$$header\""; done \
	  | $(CXX) $(CXXFLAGS) -fsyntax-only -x c++ -I. -

clean:
	rm -rf build
