#include "Json.h"

#include <cmath>
#include <cstdlib>

namespace backtick {

bool Json::parse(std::string_view source) {
  source_ = source;
  at_ = 0;
  values_.clear();
  items_.clear();
  keys_.clear();
  text_.clear();
  error_.clear();
  // One reservation rather than growth: a bundle's node count tracks its text
  // closely, and a reallocating vector under an arena of indices is a copy of
  // everything already read.
  values_.reserve(source.size() / 8 + 16);
  if (!value(root_)) {
    return false;
  }
  skipSpace();
  return at_ == source_.size() ? true : fail("trailing text");
}

std::string_view Json::text(const JsonValue& of) const {
  return std::string_view(text_).substr(of.text, of.textLength);
}

std::string_view Json::key(const JsonValue& of, unsigned int at) const {
  const JsonValue& held = values_[keys_[of.first + at]];
  return text(held);
}

unsigned int Json::push(JsonValue value) {
  values_.push_back(value);
  return static_cast<unsigned int>(values_.size() - 1);
}

void Json::skipSpace() {
  while (at_ < source_.size()) {
    char c = source_[at_];
    if (c == ' ' || c == '\t' || c == '\n' || c == '\r') {
      at_++;
    } else {
      break;
    }
  }
}

bool Json::fail(const char* said) {
  if (error_.empty()) {
    error_ = std::string(said) + " at " + std::to_string(at_);
  }
  return false;
}

bool Json::value(unsigned int& out) {
  skipSpace();
  if (at_ >= source_.size()) {
    return fail("end of input");
  }
  switch (source_[at_]) {
    case '{':
      return object(out);
    case '[':
      return array(out);
    case '"':
      return string(out);
    case 't':
      return literal("true", JsonKind::True, out);
    case 'f':
      return literal("false", JsonKind::False, out);
    case 'n':
      return literal("null", JsonKind::Null, out);
    default:
      return number(out);
  }
}

bool Json::literal(std::string_view word, JsonKind kind, unsigned int& out) {
  if (source_.compare(at_, word.size(), word) != 0) {
    return fail("bad literal");
  }
  at_ += word.size();
  JsonValue held;
  held.kind = kind;
  out = push(held);
  return true;
}

bool Json::number(unsigned int& out) {
  size_t start = at_;
  if (at_ < source_.size() && (source_[at_] == '-' || source_[at_] == '+')) {
    at_++;
  }
  while (at_ < source_.size()) {
    char c = source_[at_];
    if ((c >= '0' && c <= '9') || c == '.' || c == 'e' || c == 'E' ||
        c == '-' || c == '+') {
      at_++;
    } else {
      break;
    }
  }
  if (at_ == start) {
    return fail("expected a value");
  }
  JsonValue held;
  held.kind = JsonKind::Number;
  held.number = std::strtod(std::string(source_.substr(start, at_ - start)).c_str(), nullptr);
  out = push(held);
  return true;
}

bool Json::string(unsigned int& out) {
  at_++;  // the opening quote
  unsigned int start = static_cast<unsigned int>(text_.size());
  while (at_ < source_.size()) {
    char c = source_[at_];
    if (c == '"') {
      at_++;
      JsonValue held;
      held.kind = JsonKind::String;
      held.text = start;
      held.textLength = static_cast<unsigned int>(text_.size()) - start;
      out = push(held);
      return true;
    }
    if (c != '\\') {
      text_.push_back(c);
      at_++;
      continue;
    }
    at_++;
    if (at_ >= source_.size()) {
      return fail("unterminated escape");
    }
    char e = source_[at_++];
    switch (e) {
      case '"': text_.push_back('"'); break;
      case '\\': text_.push_back('\\'); break;
      case '/': text_.push_back('/'); break;
      case 'b': text_.push_back('\b'); break;
      case 'f': text_.push_back('\f'); break;
      case 'n': text_.push_back('\n'); break;
      case 'r': text_.push_back('\r'); break;
      case 't': text_.push_back('\t'); break;
      case 'u': {
        if (at_ + 4 > source_.size()) {
          return fail("short \\u escape");
        }
        unsigned int code = 0;
        for (int i = 0; i < 4; i++) {
          char h = source_[at_++];
          code <<= 4;
          if (h >= '0' && h <= '9') code |= static_cast<unsigned int>(h - '0');
          else if (h >= 'a' && h <= 'f') code |= static_cast<unsigned int>(h - 'a' + 10);
          else if (h >= 'A' && h <= 'F') code |= static_cast<unsigned int>(h - 'A' + 10);
          else return fail("bad \\u escape");
        }
        // A surrogate pair, where one arrives: the bundle writes `<` for a
        // `<` and nothing above the BMP today, but a string in a bundle is the
        // app's and may hold anything.
        if (code >= 0xD800 && code <= 0xDBFF && at_ + 6 <= source_.size() &&
            source_[at_] == '\\' && source_[at_ + 1] == 'u') {
          unsigned int low = 0;
          bool ok = true;
          for (int i = 0; i < 4; i++) {
            char h = source_[at_ + 2 + static_cast<size_t>(i)];
            low <<= 4;
            if (h >= '0' && h <= '9') low |= static_cast<unsigned int>(h - '0');
            else if (h >= 'a' && h <= 'f') low |= static_cast<unsigned int>(h - 'a' + 10);
            else if (h >= 'A' && h <= 'F') low |= static_cast<unsigned int>(h - 'A' + 10);
            else { ok = false; break; }
          }
          if (ok && low >= 0xDC00 && low <= 0xDFFF) {
            at_ += 6;
            code = 0x10000 + ((code - 0xD800) << 10) + (low - 0xDC00);
          }
        }
        if (code < 0x80) {
          text_.push_back(static_cast<char>(code));
        } else if (code < 0x800) {
          text_.push_back(static_cast<char>(0xC0 | (code >> 6)));
          text_.push_back(static_cast<char>(0x80 | (code & 0x3F)));
        } else if (code < 0x10000) {
          text_.push_back(static_cast<char>(0xE0 | (code >> 12)));
          text_.push_back(static_cast<char>(0x80 | ((code >> 6) & 0x3F)));
          text_.push_back(static_cast<char>(0x80 | (code & 0x3F)));
        } else {
          text_.push_back(static_cast<char>(0xF0 | (code >> 18)));
          text_.push_back(static_cast<char>(0x80 | ((code >> 12) & 0x3F)));
          text_.push_back(static_cast<char>(0x80 | ((code >> 6) & 0x3F)));
          text_.push_back(static_cast<char>(0x80 | (code & 0x3F)));
        }
        break;
      }
      default:
        return fail("unknown escape");
    }
  }
  return fail("unterminated string");
}

bool Json::array(unsigned int& out) {
  at_++;  // `[`
  // Built on a scratch list first: nested arrays would interleave their
  // children in the shared one, and a bundle is arrays all the way down.
  std::vector<unsigned int> held;
  skipSpace();
  if (at_ < source_.size() && source_[at_] == ']') {
    at_++;
  } else {
    while (true) {
      unsigned int child = 0;
      if (!value(child)) {
        return false;
      }
      held.push_back(child);
      skipSpace();
      if (at_ >= source_.size()) {
        return fail("unterminated array");
      }
      if (source_[at_] == ',') {
        at_++;
        continue;
      }
      if (source_[at_] == ']') {
        at_++;
        break;
      }
      return fail("expected `,` or `]`");
    }
  }
  JsonValue value;
  value.kind = JsonKind::Array;
  value.first = static_cast<unsigned int>(items_.size());
  value.count = static_cast<unsigned int>(held.size());
  items_.insert(items_.end(), held.begin(), held.end());
  out = push(value);
  return true;
}

bool Json::object(unsigned int& out) {
  at_++;  // `{`
  std::vector<unsigned int> names;
  std::vector<unsigned int> held;
  skipSpace();
  if (at_ < source_.size() && source_[at_] == '}') {
    at_++;
  } else {
    while (true) {
      skipSpace();
      if (at_ >= source_.size() || source_[at_] != '"') {
        return fail("expected a key");
      }
      unsigned int name = 0;
      if (!string(name)) {
        return false;
      }
      skipSpace();
      if (at_ >= source_.size() || source_[at_] != ':') {
        return fail("expected `:`");
      }
      at_++;
      unsigned int child = 0;
      if (!value(child)) {
        return false;
      }
      names.push_back(name);
      held.push_back(child);
      skipSpace();
      if (at_ >= source_.size()) {
        return fail("unterminated object");
      }
      if (source_[at_] == ',') {
        at_++;
        continue;
      }
      if (source_[at_] == '}') {
        at_++;
        break;
      }
      return fail("expected `,` or `}`");
    }
  }
  JsonValue value;
  value.kind = JsonKind::Object;
  value.first = static_cast<unsigned int>(items_.size());
  value.count = static_cast<unsigned int>(held.size());
  // Keys and values at matching offsets, so one index reaches both.
  items_.insert(items_.end(), held.begin(), held.end());
  keys_.resize(items_.size(), 0);
  for (size_t i = 0; i < names.size(); i++) {
    keys_[value.first + i] = names[i];
  }
  out = push(value);
  return true;
}

}  // namespace backtick
