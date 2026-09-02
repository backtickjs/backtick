#include "render.h"

#include <set>

#include "../src/Interpreter.h"

namespace backtick {

static std::string quote(const std::string& of) {
  // `JSON.stringify` of a string: the escapes it writes, and no others.
  std::string held = "\"";
  for (unsigned char c : of) {
    switch (c) {
      case '"': held += "\\\""; break;
      case '\\': held += "\\\\"; break;
      case '\b': held += "\\b"; break;
      case '\f': held += "\\f"; break;
      case '\n': held += "\\n"; break;
      case '\r': held += "\\r"; break;
      case '\t': held += "\\t"; break;
      default:
        if (c < 0x20) {
          char escape[8];
          std::snprintf(escape, sizeof(escape), "\\u%04x", c);
          held += escape;
        } else {
          held += static_cast<char>(c);
        }
    }
  }
  return held + "\"";
}

static std::string render(const Value& of, const std::string& indent,
                          std::set<const void*>& seen);

// A value inside an attribute, as `renderMarkup`'s `renderInline` writes one:
// on one line, and a container spelled with its members rather than broken
// across lines the way a rendered value is.
static std::string inlineValue(const Value& of) {
  switch (of.kind()) {
    case Kind::Null: return "null";
    case Kind::Boolean: return of.boolean() ? "true" : "false";
    case Kind::Number: return numberToString(of.number());
    case Kind::String: return quote(of.string());
    case Kind::Function: return "[function]";
    case Kind::Handle: return std::string("[") + of.handleName() + "]";
    case Kind::Array: {
      std::string held = "[";
      const Array& members = *of.array();
      for (size_t i = 0; i < members.size(); i++) {
        if (i > 0) held += ", ";
        held += inlineValue(members[i]);
      }
      return held + "]";
    }
    case Kind::Record: {
      const Object& members = *of.record();
      std::string held = "{ ";
      for (size_t i = 0; i < members.keys.size(); i++) {
        if (i > 0) held += ", ";
        held += quote(members.keys[i]) + ": " + inlineValue(members.values[i]);
      }
      return held + " }";
    }
    case Kind::Element:
      return "";  // handled by the caller, which knows the indent
  }
  return "null";
}

// A drawing as `renderMarkup` writes one: children in the body, props as
// attributes, and a primitive child as the text node the client makes of it.
static std::string markup(const Value& of, const std::string& indent) {
  if (of.kind() != Kind::Element) {
    return "{" + quote(valueToString(of)) + "}";
  }
  const Drawing& held = *of.drawing();
  std::string opening = "<" + held.id;
  const Object& props = *held.props;
  for (size_t i = 0; i < props.keys.size(); i++) {
    const Value& value = props.values[i];
    opening += " " + props.keys[i] + "=";
    if (value.kind() == Kind::String) {
      opening += quote(value.string());
    } else if (value.kind() == Kind::Element) {
      opening += "{" + markup(value, indent) + "}";
    } else {
      opening += "{" + inlineValue(value) + "}";
    }
  }
  if (held.children.empty()) {
    return opening + " />";
  }
  const std::string inner = indent + "  ";
  std::string body;
  for (size_t i = 0; i < held.children.size(); i++) {
    if (i > 0) body += "\n";
    body += inner + markup(held.children[i], inner);
  }
  return opening + ">\n" + body + "\n" + indent + "</" + held.id + ">";
}

static std::string render(const Value& of, const std::string& indent,
                          std::set<const void*>& seen) {
  switch (of.kind()) {
    case Kind::Null:
      return "null";
    case Kind::Boolean:
      return of.boolean() ? "true" : "false";
    case Kind::Number:
      return numberToString(of.number());
    case Kind::String:
      return quote(of.string());
    case Kind::Function:
      return "[function]";
    case Kind::Handle:
      return std::string("[") + of.handleName() + "]";
    case Kind::Element:
      return markup(of, indent);
    case Kind::Array: {
      const void* at = of.array().get();
      if (seen.count(at) != 0) return "[circular]";
      const Array& held = *of.array();
      if (held.empty()) return "[]";
      seen.insert(at);
      const std::string inner = indent + "  ";
      std::string out = "[\n";
      for (size_t i = 0; i < held.size(); i++) {
        out += inner + render(held[i], inner, seen);
        if (i + 1 < held.size()) out += ",";
        out += "\n";
      }
      seen.erase(at);
      return out + indent + "]";
    }
    case Kind::Record: {
      const void* at = of.record().get();
      if (seen.count(at) != 0) return "[circular]";
      const Object& held = *of.record();
      if (held.keys.empty()) return "{}";
      seen.insert(at);
      const std::string inner = indent + "  ";
      std::string out = "{\n";
      for (size_t i = 0; i < held.keys.size(); i++) {
        out += inner + quote(held.keys[i]) + ": " +
               render(held.values[i], inner, seen);
        if (i + 1 < held.keys.size()) out += ",";
        out += "\n";
      }
      seen.erase(at);
      return out + indent + "}";
    }
  }
  return "null";
}

std::string renderValue(const Value& of) {
  std::set<const void*> seen;
  return render(of, "", seen);
}

}  // namespace backtick
