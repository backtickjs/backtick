#pragma once

#include <string>
#include <string_view>
#include <vector>

namespace backtick {

// A JSON reader, only as much of one as a bundle needs.
//
// Parsed into one flat vector rather than a tree of allocations: a node is an
// index, a child is an index, and the whole document frees at once. What this
// costs in convenience it buys back on a device with 512 KB and no allocator
// worth trusting in a loop.
enum class JsonKind : unsigned char {
  Null,
  False,
  True,
  Number,
  String,
  Array,
  Object,
};

struct JsonValue {
  JsonKind kind = JsonKind::Null;
  double number = 0;
  // Into the reader's `text` arena, for a string or an object member's key.
  unsigned int text = 0;
  unsigned int textLength = 0;
  // Into `items`, for an array's elements or an object's values. An object's
  // keys sit in `keys` at the same offsets.
  unsigned int first = 0;
  unsigned int count = 0;
};

class Json {
 public:
  // Reads a whole document. False on malformed input, with `error` saying
  // where — a bundle that does not parse is a bug in whoever wrote it, and
  // saying so beats a reader that carries on.
  bool parse(std::string_view source);

  const JsonValue& root() const { return values_[root_]; }
  const JsonValue& at(unsigned int index) const { return values_[index]; }

  // An array's element, or an object's value, by position.
  const JsonValue& item(const JsonValue& of, unsigned int at) const {
    return values_[items_[of.first + at]];
  }
  std::string_view key(const JsonValue& of, unsigned int at) const;
  std::string_view text(const JsonValue& of) const;

  const std::string& error() const { return error_; }

 private:
  bool value(unsigned int& out);
  bool array(unsigned int& out);
  bool object(unsigned int& out);
  bool string(unsigned int& out);
  bool number(unsigned int& out);
  bool literal(std::string_view word, JsonKind kind, unsigned int& out);
  void skipSpace();
  bool fail(const char* said);
  unsigned int push(JsonValue value);

  std::string_view source_;
  size_t at_ = 0;
  unsigned int root_ = 0;
  std::vector<JsonValue> values_;
  std::vector<unsigned int> items_;
  std::vector<unsigned int> keys_;
  std::string text_;
  std::string error_;
};

}  // namespace backtick
