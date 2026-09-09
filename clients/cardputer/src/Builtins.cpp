#include "Builtins.h"

#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <functional>
#include <stdexcept>

#include "Json.h"

namespace backtick {

namespace {

Value native(const char* name, Native of) {
  auto held = std::make_shared<Closure>();
  held->native = std::move(of);
  held->name = name;
  return Value::function(held);
}

const Value& argument(std::vector<Value>& args, size_t at) {
  static const Value absent;
  return at < args.size() ? args[at] : absent;
}

double numberAt(std::vector<Value>& args, size_t at) {
  return argument(args, at).number();
}

const std::string& textAt(std::vector<Value>& args, size_t at) {
  static const std::string empty;
  const Value& held = argument(args, at);
  return held.kind() == Kind::String ? held.string() : empty;
}

// A member call arrives with its receiver first, which is how the schema
// writes it: `string.charAt(self, pos)`.
void one(Interpreter& into, const char* name, Native of) {
  into.builtins[name] = native(name, std::move(of));
}

void constant(Interpreter& into, const char* name, double of) {
  into.builtins[name] = Value::number(of);
}

// An index the way the string and array members take one: a negative counts
// from the end, and anything past either end clamps.
long long clampIndex(double given, long long length) {
  if (std::isnan(given)) return 0;
  long long at = static_cast<long long>(given);
  if (at < 0) at += length;
  if (at < 0) return 0;
  if (at > length) return length;
  return at;
}

std::string toText(const Value& of) { return valueToString(of); }

}  // namespace

void installLanguageBuiltins(Interpreter& machine) {
  Interpreter& into = machine;

  // ---- boolean ----
  one(into, "boolean.valueOf", [](std::vector<Value>& a) {
    return Value::boolean(argument(a, 0).boolean());
  });

  // ---- number ----
  one(into, "number.toString", [](std::vector<Value>& a) {
    double of = numberAt(a, 0);
    if (a.size() > 1 && argument(a, 1).kind() == Kind::Number) {
      int radix = static_cast<int>(numberAt(a, 1));
      if (radix != 10) {
        bool negative = of < 0;
        long long whole = static_cast<long long>(std::fabs(of));
        std::string held;
        if (whole == 0) held = "0";
        while (whole > 0) {
          int digit = static_cast<int>(whole % radix);
          held += static_cast<char>(digit < 10 ? '0' + digit : 'a' + digit - 10);
          whole /= radix;
        }
        std::reverse(held.begin(), held.end());
        return Value::string(negative ? "-" + held : held);
      }
    }
    return Value::string(numberToString(of));
  });
  one(into, "number.toFixed", [](std::vector<Value>& a) {
    char held[64];
    std::snprintf(held, sizeof(held), "%.*f",
                  static_cast<int>(a.size() > 1 ? numberAt(a, 1) : 0),
                  numberAt(a, 0));
    return Value::string(held);
  });
  one(into, "number.toExponential", [](std::vector<Value>& a) {
    char held[64];
    std::snprintf(held, sizeof(held), "%.*e",
                  static_cast<int>(a.size() > 1 ? numberAt(a, 1) : 6),
                  numberAt(a, 0));
    // JavaScript writes `e+1`, C writes `e+01`.
    std::string out = held;
    size_t e = out.find('e');
    if (e != std::string::npos) {
      size_t digit = e + 2;
      size_t from = digit;
      while (from + 1 < out.size() && out[from] == '0') from++;
      out = out.substr(0, digit) + out.substr(from);
    }
    return Value::string(out);
  });
  one(into, "number.toPrecision", [](std::vector<Value>& a) {
    if (a.size() < 2) return Value::string(numberToString(numberAt(a, 0)));
    char held[64];
    std::snprintf(held, sizeof(held), "%.*g", static_cast<int>(numberAt(a, 1)),
                  numberAt(a, 0));
    return Value::string(held);
  });
  one(into, "number.valueOf", [](std::vector<Value>& a) {
    return Value::number(numberAt(a, 0));
  });

  // ---- string ----
  one(into, "string.toString", [](std::vector<Value>& a) {
    return Value::string(textAt(a, 0));
  });
  one(into, "string.valueOf", [](std::vector<Value>& a) {
    return Value::string(textAt(a, 0));
  });
  one(into, "string.charAt", [](std::vector<Value>& a) {
    const std::string& of = textAt(a, 0);
    double at = numberAt(a, 1);
    if (at < 0 || at >= static_cast<double>(of.size())) return Value::string("");
    return Value::string(std::string(1, of[static_cast<size_t>(at)]));
  });
  one(into, "string.charCodeAt", [](std::vector<Value>& a) {
    const std::string& of = textAt(a, 0);
    double at = numberAt(a, 1);
    if (at < 0 || at >= static_cast<double>(of.size())) {
      return Value::number(std::nan(""));
    }
    return Value::number(static_cast<unsigned char>(of[static_cast<size_t>(at)]));
  });
  one(into, "string.concat", [](std::vector<Value>& a) {
    std::string held = textAt(a, 0);
    for (size_t i = 1; i < a.size(); i++) held += toText(a[i]);
    return Value::string(held);
  });
  one(into, "string.indexOf", [](std::vector<Value>& a) {
    size_t at = textAt(a, 0).find(textAt(a, 1));
    return Value::number(at == std::string::npos ? -1 : static_cast<double>(at));
  });
  one(into, "string.lastIndexOf", [](std::vector<Value>& a) {
    size_t at = textAt(a, 0).rfind(textAt(a, 1));
    return Value::number(at == std::string::npos ? -1 : static_cast<double>(at));
  });
  one(into, "string.localeCompare", [](std::vector<Value>& a) {
    const std::string& left = textAt(a, 0);
    const std::string& right = textAt(a, 1);
    return Value::number(left < right ? -1 : (left > right ? 1 : 0));
  });
  one(into, "string.replace", [](std::vector<Value>& a) {
    std::string of = textAt(a, 0);
    const std::string& what = textAt(a, 1);
    const std::string& with = textAt(a, 2);
    size_t at = of.find(what);
    if (at == std::string::npos || what.empty()) return Value::string(of);
    return Value::string(of.substr(0, at) + with + of.substr(at + what.size()));
  });
  one(into, "string.slice", [](std::vector<Value>& a) {
    const std::string& of = textAt(a, 0);
    long long length = static_cast<long long>(of.size());
    long long from = a.size() > 1 ? clampIndex(numberAt(a, 1), length) : 0;
    long long to = a.size() > 2 && argument(a, 2).kind() == Kind::Number
                       ? clampIndex(numberAt(a, 2), length)
                       : length;
    if (to <= from) return Value::string("");
    return Value::string(of.substr(static_cast<size_t>(from),
                                   static_cast<size_t>(to - from)));
  });
  one(into, "string.substring", [](std::vector<Value>& a) {
    const std::string& of = textAt(a, 0);
    long long length = static_cast<long long>(of.size());
    long long from = a.size() > 1 ? std::max(0LL, std::min(static_cast<long long>(numberAt(a, 1)), length)) : 0;
    long long to = a.size() > 2 && argument(a, 2).kind() == Kind::Number
                       ? std::max(0LL, std::min(static_cast<long long>(numberAt(a, 2)), length))
                       : length;
    if (from > to) std::swap(from, to);
    return Value::string(of.substr(static_cast<size_t>(from),
                                   static_cast<size_t>(to - from)));
  });
  one(into, "string.split", [](std::vector<Value>& a) {
    const std::string& of = textAt(a, 0);
    const std::string& on = textAt(a, 1);
    auto held = std::make_shared<Array>();
    if (on.empty()) {
      for (char c : of) held->push_back(Value::string(std::string(1, c)));
      return Value::array(held);
    }
    size_t at = 0;
    while (true) {
      size_t next = of.find(on, at);
      if (next == std::string::npos) {
        held->push_back(Value::string(of.substr(at)));
        break;
      }
      held->push_back(Value::string(of.substr(at, next - at)));
      at = next + on.size();
    }
    return Value::array(held);
  });
  one(into, "string.toLowerCase", [](std::vector<Value>& a) {
    std::string of = textAt(a, 0);
    for (char& c : of) c = static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
    return Value::string(of);
  });
  into.builtins["string.toLocaleLowerCase"] = into.builtins["string.toLowerCase"];
  one(into, "string.toUpperCase", [](std::vector<Value>& a) {
    std::string of = textAt(a, 0);
    for (char& c : of) c = static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
    return Value::string(of);
  });
  into.builtins["string.toLocaleUpperCase"] = into.builtins["string.toUpperCase"];
  one(into, "string.trim", [](std::vector<Value>& a) {
    std::string of = textAt(a, 0);
    size_t from = of.find_first_not_of(" \t\n\r\f\v");
    if (from == std::string::npos) return Value::string("");
    size_t to = of.find_last_not_of(" \t\n\r\f\v");
    return Value::string(of.substr(from, to - from + 1));
  });
  one(into, "string.length", [](std::vector<Value>& a) {
    return Value::number(static_cast<double>(textAt(a, 0).size()));
  });

  // ---- array ----
  one(into, "array.length", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    return Value::number(of.kind() == Kind::Array
                             ? static_cast<double>(of.array()->size())
                             : 0);
  });
  one(into, "array.concat", [](std::vector<Value>& a) {
    auto held = std::make_shared<Array>();
    for (const Value& one : a) {
      if (one.kind() == Kind::Array) {
        for (const Value& member : *one.array()) held->push_back(member);
      } else {
        held->push_back(one);
      }
    }
    return Value::array(held);
  });
  one(into, "array.join", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    const std::string on = a.size() > 1 && argument(a, 1).kind() == Kind::String
                               ? textAt(a, 1)
                               : ",";
    if (of.kind() != Kind::Array) return Value::string("");
    std::string held;
    const Array& members = *of.array();
    for (size_t i = 0; i < members.size(); i++) {
      if (i > 0) held += on;
      held += toText(members[i]);
    }
    return Value::string(held);
  });
  one(into, "array.slice", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    auto held = std::make_shared<Array>();
    if (of.kind() != Kind::Array) return Value::array(held);
    const Array& members = *of.array();
    long long length = static_cast<long long>(members.size());
    long long from = a.size() > 1 ? clampIndex(numberAt(a, 1), length) : 0;
    long long to = a.size() > 2 && argument(a, 2).kind() == Kind::Number
                       ? clampIndex(numberAt(a, 2), length)
                       : length;
    for (long long i = from; i < to; i++) held->push_back(members[static_cast<size_t>(i)]);
    return Value::array(held);
  });
  one(into, "array.indexOf", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    if (of.kind() != Kind::Array) return Value::number(-1);
    const Array& members = *of.array();
    for (size_t i = 0; i < members.size(); i++) {
      if (members[i].same(argument(a, 1))) return Value::number(static_cast<double>(i));
    }
    return Value::number(-1);
  });
  one(into, "array.includes", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    if (of.kind() != Kind::Array) return Value::boolean(false);
    for (const Value& member : *of.array()) {
      if (member.same(argument(a, 1))) return Value::boolean(true);
    }
    return Value::boolean(false);
  });
  one(into, "array.with", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    auto held = std::make_shared<Array>();
    if (of.kind() != Kind::Array) return Value::array(held);
    *held = *of.array();
    long long at = static_cast<long long>(numberAt(a, 1));
    if (at < 0) at += static_cast<long long>(held->size());
    if (at >= 0 && at < static_cast<long long>(held->size())) {
      (*held)[static_cast<size_t>(at)] = argument(a, 2);
    }
    return Value::array(held);
  });
  one(into, "array.toReversed", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    auto held = std::make_shared<Array>();
    if (of.kind() != Kind::Array) return Value::array(held);
    *held = *of.array();
    std::reverse(held->begin(), held->end());
    return Value::array(held);
  });
  one(into, "array.toSpliced", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    auto held = std::make_shared<Array>();
    if (of.kind() != Kind::Array) return Value::array(held);
    const Array& members = *of.array();
    long long length = static_cast<long long>(members.size());
    long long from = clampIndex(numberAt(a, 1), length);
    long long drop = a.size() > 2 ? static_cast<long long>(numberAt(a, 2)) : length - from;
    drop = std::max(0LL, std::min(drop, length - from));
    for (long long i = 0; i < from; i++) held->push_back(members[static_cast<size_t>(i)]);
    for (size_t i = 3; i < a.size(); i++) held->push_back(a[i]);
    for (long long i = from + drop; i < length; i++) held->push_back(members[static_cast<size_t>(i)]);
    return Value::array(held);
  });

  // ---- the members that call something ----
  //
  // These reach back into the interpreter, because what they take is a
  // function the bundle wrote and calling it is the interpreter's to do.
  Interpreter* calls = &into;

  one(into, "array.map", [calls](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    auto held = std::make_shared<Array>();
    if (of.kind() != Kind::Array) return Value::array(held);
    const Array& members = *of.array();
    for (size_t i = 0; i < members.size(); i++) {
      std::vector<Value> args{members[i], Value::number(static_cast<double>(i))};
      held->push_back(calls->call(argument(a, 1), args));
    }
    return Value::array(held);
  });
  one(into, "array.filter", [calls](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    auto held = std::make_shared<Array>();
    if (of.kind() != Kind::Array) return Value::array(held);
    const Array& members = *of.array();
    for (size_t i = 0; i < members.size(); i++) {
      std::vector<Value> args{members[i], Value::number(static_cast<double>(i))};
      if (calls->call(argument(a, 1), args).boolean()) {
        held->push_back(members[i]);
      }
    }
    return Value::array(held);
  });
  one(into, "array.reduce", [calls](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    if (of.kind() != Kind::Array) return Value::null();
    const Array& members = *of.array();
    size_t at = 0;
    Value held;
    if (a.size() > 2) {
      held = a[2];
    } else {
      if (members.empty()) return Value::null();
      held = members[0];
      at = 1;
    }
    for (; at < members.size(); at++) {
      std::vector<Value> args{held, members[at],
                              Value::number(static_cast<double>(at))};
      held = calls->call(argument(a, 1), args);
    }
    return held;
  });
  one(into, "array.toSorted", [calls](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    auto held = std::make_shared<Array>();
    if (of.kind() != Kind::Array) return Value::array(held);
    *held = *of.array();
    const Value comparer = argument(a, 1);
    std::stable_sort(held->begin(), held->end(),
                     [calls, &comparer](const Value& left, const Value& right) {
                       if (comparer.kind() == Kind::Function) {
                         std::vector<Value> args{left, right};
                         return calls->call(comparer, args).number() < 0;
                       }
                       // No comparer sorts by text, as the language's does.
                       return toText(left) < toText(right);
                     });
    return Value::array(held);
  });
  one(into, "Array.from", [calls](std::vector<Value>& a) {
    auto held = std::make_shared<Array>();
    const Value& of = argument(a, 0);
    std::vector<Value> members;
    if (of.kind() == Kind::Array) {
      members = *of.array();
    } else if (of.kind() == Kind::Record) {
      // `{ length: n }`, which is what the schema's `ArrayLike` names.
      const Value* length = of.record()->find("length");
      if (length != nullptr) {
        for (double i = 0; i < length->number(); i++) {
          const Value* at = of.record()->find(numberToString(i));
          members.push_back(at == nullptr ? Value::null() : *at);
        }
      }
    }
    const Value make = argument(a, 1);
    for (size_t i = 0; i < members.size(); i++) {
      if (make.kind() == Kind::Function) {
        std::vector<Value> args{members[i], Value::number(static_cast<double>(i))};
        held->push_back(calls->call(make, args));
      } else {
        held->push_back(members[i]);
      }
    }
    return Value::array(held);
  });
  one(into, "Array.of", [](std::vector<Value>& a) {
    auto held = std::make_shared<Array>();
    *held = a;
    return Value::array(held);
  });

  // ---- storage ----
  //
  // A cell holds what it was given and hands it back. Nothing here watches it:
  // what a write is for is a drawing that reads it, and that is the renderer's
  // half of this client rather than the language's.
  one(into, "state", [calls](std::vector<Value>& a) {
    // The same cell this call site had last time, or a new one holding the
    // initial. What makes that safe is the format's own guarantee: evaluation
    // is deterministic, so the Nth `state` of one run is the Nth of the next.
    std::shared_ptr<Cell> cell;
    if (calls->nextCell < calls->cells.size()) {
      cell = calls->cells[calls->nextCell];
    } else {
      cell = std::make_shared<Cell>();
      cell->value = argument(a, 0);
      calls->cells.push_back(cell);
    }
    calls->nextCell++;
    auto held = std::make_shared<Object>();
    held->set("read", native("read", [cell](std::vector<Value>&) {
                return cell->value;
              }));
    held->set("write", native("write", [cell, calls](std::vector<Value>& args) {
                cell->value = argument(args, 0);
                calls->generation++;
                return Value::null();
              }));
    held->set("update", native("update", [cell, calls](std::vector<Value>& args) {
                std::vector<Value> given{cell->value};
                cell->value = calls->call(argument(args, 0), given);
                calls->generation++;
                return Value::null();
              }));
    return Value::record(held);
  });

  // Where a `for` member sits, as storage. The same shape `state` hands over,
  // because a position is a thing that changes without the member changing and
  // a drawing reads it the same way.
  into.position = [](size_t at) {
    auto cell = std::make_shared<Cell>();
    cell->value = Value::number(static_cast<double>(at));
    auto held = std::make_shared<Object>();
    held->set("read", native("read", [cell](std::vector<Value>&) {
                return cell->value;
              }));
    return Value::record(held);
  };

  // No timers here. A clock is the target's rather than the language's, so a
  // script reaches one off whatever its target hands over — `$window` on the
  // web — and this target hands over none.

  // ---- JSON ----
  one(into, "JSON.stringify", [](std::vector<Value>& a) {
    // Only what the language can hold, which is what a bundle can carry.
    std::function<std::string(const Value&)> write = [&](const Value& of) -> std::string {
      switch (of.kind()) {
        case Kind::Null: return "null";
        case Kind::Boolean: return of.boolean() ? "true" : "false";
        case Kind::Number: return numberToString(of.number());
        case Kind::String: {
          std::string held = "\"";
          for (char c : of.string()) {
            if (c == '"' || c == '\\') { held += '\\'; held += c; }
            else if (c == '\n') held += "\\n";
            else held += c;
          }
          return held + "\"";
        }
        case Kind::Array: {
          std::string held = "[";
          const Array& members = *of.array();
          for (size_t i = 0; i < members.size(); i++) {
            if (i > 0) held += ",";
            held += write(members[i]);
          }
          return held + "]";
        }
        case Kind::Record: {
          std::string held = "{";
          const Object& members = *of.record();
          for (size_t i = 0; i < members.keys.size(); i++) {
            if (i > 0) held += ",";
            held += "\"" + members.keys[i] + "\":" + write(members.values[i]);
          }
          return held + "}";
        }
        default: return "null";
      }
    };
    return Value::string(write(argument(a, 0)));
  });

  one(into, "JSON.parse", [](std::vector<Value>& a) {
    Json read;
    if (!read.parse(textAt(a, 0))) {
      throw Thrown{Value::string("bad JSON: " + read.error())};
    }
    std::function<Value(const JsonValue&)> take = [&](const JsonValue& of) -> Value {
      switch (of.kind) {
        case JsonKind::Null: return Value::null();
        case JsonKind::True: return Value::boolean(true);
        case JsonKind::False: return Value::boolean(false);
        case JsonKind::Number: return Value::number(of.number);
        case JsonKind::String: return Value::string(std::string(read.text(of)));
        case JsonKind::Array: {
          auto held = std::make_shared<Array>();
          for (unsigned int i = 0; i < of.count; i++) {
            held->push_back(take(read.item(of, i)));
          }
          return Value::array(held);
        }
        case JsonKind::Object: {
          auto held = std::make_shared<Object>();
          for (unsigned int i = 0; i < of.count; i++) {
            held->set(std::string(read.key(of, i)), take(read.item(of, i)));
          }
          return Value::record(held);
        }
      }
      return Value::null();
    };
    return take(read.root());
  });

  // ---- Math ----
  constant(into, "Math.E", M_E);
  constant(into, "Math.LN10", M_LN10);
  constant(into, "Math.LN2", M_LN2);
  constant(into, "Math.LOG2E", M_LOG2E);
  constant(into, "Math.LOG10E", M_LOG10E);
  constant(into, "Math.PI", M_PI);
  constant(into, "Math.SQRT1_2", M_SQRT1_2);
  constant(into, "Math.SQRT2", M_SQRT2);
  constant(into, "Number.EPSILON", 2.220446049250313e-16);

  const struct { const char* name; double (*of)(double); } unary[] = {
      {"Math.abs", std::fabs},   {"Math.acos", std::acos},
      {"Math.asin", std::asin},  {"Math.atan", std::atan},
      {"Math.ceil", std::ceil},  {"Math.cos", std::cos},
      {"Math.exp", std::exp},    {"Math.floor", std::floor},
      {"Math.log", std::log},    {"Math.sin", std::sin},
      {"Math.sqrt", std::sqrt},  {"Math.tan", std::tan},
      {"Math.log10", std::log10},{"Math.log2", std::log2},
      {"Math.log1p", std::log1p},{"Math.expm1", std::expm1},
      {"Math.cosh", std::cosh},  {"Math.sinh", std::sinh},
      {"Math.tanh", std::tanh},  {"Math.acosh", std::acosh},
      {"Math.asinh", std::asinh},{"Math.atanh", std::atanh},
      {"Math.trunc", std::trunc},{"Math.cbrt", std::cbrt},
  };
  for (const auto& held : unary) {
    double (*of)(double) = held.of;
    one(into, held.name, [of](std::vector<Value>& a) {
      return Value::number(of(numberAt(a, 0)));
    });
  }
  one(into, "Math.round", [](std::vector<Value>& a) {
    // JavaScript rounds halves up, where `std::round` rounds away from zero.
    return Value::number(std::floor(numberAt(a, 0) + 0.5));
  });
  one(into, "Math.atan2", [](std::vector<Value>& a) {
    return Value::number(std::atan2(numberAt(a, 0), numberAt(a, 1)));
  });
  one(into, "Math.pow", [](std::vector<Value>& a) {
    return Value::number(std::pow(numberAt(a, 0), numberAt(a, 1)));
  });
  one(into, "Math.hypot", [](std::vector<Value>& a) {
    double held = 0;
    for (const Value& one : a) held += one.number() * one.number();
    return Value::number(std::sqrt(held));
  });
  one(into, "Math.max", [](std::vector<Value>& a) {
    if (a.empty()) return Value::number(-INFINITY);
    double held = -INFINITY;
    for (const Value& one : a) held = std::max(held, one.number());
    return Value::number(held);
  });
  one(into, "Math.min", [](std::vector<Value>& a) {
    if (a.empty()) return Value::number(INFINITY);
    double held = INFINITY;
    for (const Value& one : a) held = std::min(held, one.number());
    return Value::number(held);
  });
  one(into, "Math.sign", [](std::vector<Value>& a) {
    double of = numberAt(a, 0);
    return Value::number(of > 0 ? 1 : (of < 0 ? -1 : of));
  });
  one(into, "Math.fround", [](std::vector<Value>& a) {
    return Value::number(static_cast<float>(numberAt(a, 0)));
  });
  one(into, "Math.clz32", [](std::vector<Value>& a) {
    unsigned int of = static_cast<unsigned int>(static_cast<long long>(numberAt(a, 0)));
    int held = 0;
    while (held < 32 && (of & 0x80000000u) == 0) { of <<= 1; held++; }
    return Value::number(held);
  });
  one(into, "Math.imul", [](std::vector<Value>& a) {
    int left = static_cast<int>(static_cast<long long>(numberAt(a, 0)));
    int right = static_cast<int>(static_cast<long long>(numberAt(a, 1)));
    return Value::number(static_cast<int>(static_cast<unsigned int>(left) *
                                          static_cast<unsigned int>(right)));
  });
  one(into, "Math.random", [](std::vector<Value>&) {
    return Value::number(static_cast<double>(std::rand()) / RAND_MAX);
  });

  // ---- Number ----
  one(into, "Number.isFinite", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    return Value::boolean(of.kind() == Kind::Number && std::isfinite(of.number()));
  });
  one(into, "Number.isInteger", [](std::vector<Value>& a) {
    const Value& of = argument(a, 0);
    return Value::boolean(of.kind() == Kind::Number &&
                          std::isfinite(of.number()) &&
                          of.number() == std::floor(of.number()));
  });
  one(into, "Number.parseFloat", [](std::vector<Value>& a) {
    return Value::number(std::strtod(textAt(a, 0).c_str(), nullptr));
  });
  one(into, "Number.parseInt", [](std::vector<Value>& a) {
    int radix = a.size() > 1 && argument(a, 1).kind() == Kind::Number
                    ? static_cast<int>(numberAt(a, 1))
                    : 10;
    return Value::number(static_cast<double>(
        std::strtoll(textAt(a, 0).c_str(), nullptr, radix)));
  });

  // ---- String ----
  one(into, "String.fromCodePoint", [](std::vector<Value>& a) {
    std::string held;
    for (const Value& one : a) {
      unsigned int code = static_cast<unsigned int>(one.number());
      if (code < 0x80) {
        held += static_cast<char>(code);
      } else if (code < 0x800) {
        held += static_cast<char>(0xC0 | (code >> 6));
        held += static_cast<char>(0x80 | (code & 0x3F));
      } else {
        held += static_cast<char>(0xE0 | (code >> 12));
        held += static_cast<char>(0x80 | ((code >> 6) & 0x3F));
        held += static_cast<char>(0x80 | (code & 0x3F));
      }
    }
    return Value::string(held);
  });
}

}  // namespace backtick
