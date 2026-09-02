#pragma once

#include <functional>
#include <memory>
#include <string>
#include <vector>

namespace backtick {

class Value;
struct Object;
struct Closure;
struct Drawing;

// What a value is on the client, as the format defines it.
//
// No `undefined`: the bundle format guarantees it never arises, so `Null` is
// the only absent case and every reader has one fewer branch to be wrong in.
//
// A `Handle` is an object the client owns and a bundle only passes along —
// storage today, a peripheral later. It carries no members a bundle can read;
// what it means is the client's.
enum class Kind : unsigned char {
  Null,
  Boolean,
  Number,
  String,
  Array,
  Record,
  Function,
  Handle,
  // Something to draw: a tag the schema declared, its props, and what it
  // holds. Structure as data, which is what a bundle carries — nothing here
  // has touched a screen yet.
  Element,
};

using Array = std::vector<Value>;
using Native = std::function<Value(std::vector<Value>&)>;

class Value {
 public:
  Value() = default;
  static Value null() { return Value(); }
  static Value boolean(bool of);
  static Value number(double of);
  static Value string(std::string of);
  static Value array(std::shared_ptr<Array> of);
  static Value record(std::shared_ptr<Object> of);
  static Value function(std::shared_ptr<Closure> of);
  static Value handle(std::shared_ptr<void> of, const char* named);
  static Value element(std::shared_ptr<Drawing> of);

  Kind kind() const { return kind_; }
  bool isNull() const { return kind_ == Kind::Null; }

  bool boolean() const { return boolean_; }
  double number() const { return number_; }
  const std::string& string() const { return *text_; }
  const std::shared_ptr<Array>& array() const { return array_; }
  const std::shared_ptr<Object>& record() const { return record_; }
  const std::shared_ptr<Closure>& function() const { return function_; }
  const std::shared_ptr<void>& handle() const { return handle_; }
  const std::shared_ptr<Drawing>& drawing() const { return drawing_; }
  const char* handleName() const { return handleName_; }

  // Identity as the language means it: the same object, or the same primitive.
  // Never a deep walk — two records with equal members are two records.
  bool same(const Value& other) const;

 private:
  Kind kind_ = Kind::Null;
  bool boolean_ = false;
  double number_ = 0;
  const char* handleName_ = "";
  std::shared_ptr<std::string> text_;
  std::shared_ptr<Array> array_;
  std::shared_ptr<Object> record_;
  std::shared_ptr<Closure> function_;
  std::shared_ptr<void> handle_;
  std::shared_ptr<Drawing> drawing_;
};

// One element of a drawing. `children` is flattened as it is built — a list
// inside a list is still one run of things to draw, and the renderer should not
// have to know which shape it arrived in.
struct Drawing {
  std::string id;
  std::shared_ptr<Object> props;
  std::vector<Value> children;
};

// A record, in the order its keys were written. Insertion order rather than
// sorted, because that is the order a reader of the rendered value expects and
// the order `Object.entries` gives.
struct Object {
  std::vector<std::string> keys;
  std::vector<Value> values;

  const Value* find(const std::string& key) const;
  void set(const std::string& key, Value value);
};

}  // namespace backtick
