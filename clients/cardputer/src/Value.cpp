#include "Value.h"

namespace backtick {

Value Value::boolean(bool of) {
  Value held;
  held.kind_ = Kind::Boolean;
  held.boolean_ = of;
  return held;
}

Value Value::number(double of) {
  Value held;
  held.kind_ = Kind::Number;
  held.number_ = of;
  return held;
}

Value Value::string(std::string of) {
  Value held;
  held.kind_ = Kind::String;
  held.text_ = std::make_shared<std::string>(std::move(of));
  return held;
}

Value Value::array(std::shared_ptr<Array> of) {
  Value held;
  held.kind_ = Kind::Array;
  held.array_ = std::move(of);
  return held;
}

Value Value::record(std::shared_ptr<Object> of) {
  Value held;
  held.kind_ = Kind::Record;
  held.record_ = std::move(of);
  return held;
}

Value Value::function(std::shared_ptr<Closure> of) {
  Value held;
  held.kind_ = Kind::Function;
  held.function_ = std::move(of);
  return held;
}

Value Value::handle(std::shared_ptr<void> of, const char* named) {
  Value held;
  held.kind_ = Kind::Handle;
  held.handle_ = std::move(of);
  held.handleName_ = named;
  return held;
}

Value Value::element(std::shared_ptr<Drawing> of) {
  Value held;
  held.kind_ = Kind::Element;
  held.drawing_ = std::move(of);
  return held;
}

bool Value::same(const Value& other) const {
  if (kind_ != other.kind_) {
    return false;
  }
  switch (kind_) {
    case Kind::Null:
      return true;
    case Kind::Boolean:
      return boolean_ == other.boolean_;
    case Kind::Number:
      return number_ == other.number_;
    case Kind::String:
      return *text_ == *other.text_;
    case Kind::Array:
      return array_ == other.array_;
    case Kind::Record:
      return record_ == other.record_;
    case Kind::Function:
      return function_ == other.function_;
    case Kind::Handle:
      return handle_ == other.handle_;
    case Kind::Element:
      return drawing_ == other.drawing_;
  }
  return false;
}

const Value* Object::find(const std::string& key) const {
  for (size_t i = 0; i < keys.size(); i++) {
    if (keys[i] == key) {
      return &values[i];
    }
  }
  return nullptr;
}

void Object::set(const std::string& key, Value value) {
  for (size_t i = 0; i < keys.size(); i++) {
    if (keys[i] == key) {
      values[i] = std::move(value);
      return;
    }
  }
  keys.push_back(key);
  values.push_back(std::move(value));
}

}  // namespace backtick
