#include "Show.h"

#include "Interpreter.h"

namespace backtick {

std::string show(const Value& of) {
  switch (of.kind()) {
    case Kind::Null: return "null";
    case Kind::Boolean: return of.boolean() ? "true" : "false";
    case Kind::Number: return numberToString(of.number());
    case Kind::String: return "\"" + of.string() + "\"";
    case Kind::Function: return "[function]";
    case Kind::Handle: return "[handle]";
    case Kind::Array: {
      std::string held = "[";
      const Array& members = *of.array();
      for (size_t i = 0; i < members.size(); i++) {
        if (i > 0) held += ",";
        held += show(members[i]);
      }
      return held + "]";
    }
    case Kind::Record: {
      std::string held = "{";
      const Object& members = *of.record();
      for (size_t i = 0; i < members.keys.size(); i++) {
        if (i > 0) held += ",";
        held += members.keys[i] + ":" + show(members.values[i]);
      }
      return held + "}";
    }
    case Kind::Element: {
      const Drawing& held = *of.drawing();
      std::string out = "<" + held.id;
      const Object& props = *held.props;
      for (size_t i = 0; i < props.keys.size(); i++) {
        out += " " + props.keys[i] + "=" + show(props.values[i]);
      }
      if (held.children.empty()) return out + "/>";
      out += ">";
      for (const Value& child : held.children) out += show(child);
      return out + "</" + held.id + ">";
    }
  }
  return "?";
}

}  // namespace backtick
