#pragma once

#include <functional>
#include <memory>
#include <string>
#include <variant>
#include <vector>

namespace backtick {

// What a value is: seven cases, mirroring `clients/js/src/Value.ts`.

// The only absent value the format has; there is no `undefined`.
using Null = std::monostate;

// Declared here and defined below, because each of them holds a `Value`.
struct Array;
struct Record;
struct Function;

// The three held by pointer are the three JavaScript holds by reference.
using Value = std::variant<Null,
                           bool,
                           double,
                           std::string,
                           std::shared_ptr<Array>,
                           std::shared_ptr<Record>,
                           std::shared_ptr<Function>>;

struct Array {
  std::vector<Value> members;
};

// Keys in the order they were written, which is what `Object.entries` gives.
struct Record {
  struct Entry {
    std::string key;
    Value value;
  };

  std::vector<Entry> entries;
};

// `(...args: Value[]) => Value`, boxed: a callable cannot name `Value` yet.
struct Function {
  std::function<Value(const std::vector<Value>&)> apply;
};

}  // namespace backtick
