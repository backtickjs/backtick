#include "Screen.h"

#include "Interpreter.h"

namespace backtick {

namespace {

// A prop, or what the schema said it is when the app left it out.
double number(const Object& props, const char* name, double otherwise) {
  const Value* held = props.find(name);
  return held != nullptr && held->kind() == Kind::Number ? held->number()
                                                        : otherwise;
}

bool flag(const Object& props, const char* name, bool otherwise) {
  const Value* held = props.find(name);
  return held != nullptr && held->kind() == Kind::Boolean ? held->boolean()
                                                          : otherwise;
}

std::string text(const Object& props, const char* name, const char* otherwise) {
  const Value* held = props.find(name);
  return held != nullptr && held->kind() == Kind::String ? held->string()
                                                        : otherwise;
}

// `0xRRGGBB` as the app writes it, narrowed to what the panel shows. White
// where it is left out, which is the only colour that reads on a black screen
// without the app saying anything.
uint16_t colour(M5Canvas& into, const Object& props) {
  const Value* held = props.find("colour");
  if (held == nullptr || held->kind() != Kind::Number) {
    return into.color565(255, 255, 255);
  }
  uint32_t of = static_cast<uint32_t>(held->number());
  return into.color565((of >> 16) & 0xFF, (of >> 8) & 0xFF, of & 0xFF);
}

// What an x and y are measured from, as `setTextDatum` names them.
textdatum_t datumOf(const std::string& named) {
  if (named == "top-centre" || named == "top-center") return top_center;
  if (named == "top-right") return top_right;
  if (named == "middle-left") return middle_left;
  if (named == "middle-centre" || named == "middle-center") return middle_center;
  if (named == "middle-right") return middle_right;
  if (named == "bottom-left") return bottom_left;
  if (named == "bottom-centre" || named == "bottom-center") return bottom_center;
  if (named == "bottom-right") return bottom_right;
  return top_left;
}

// What an element says, which is its children run together. A number is
// written as the language writes one, so a count needs no formatting.
std::string saying(const Drawing& of) {
  std::string held;
  for (const Value& child : of.children) {
    if (child.kind() == Kind::Element) continue;
    held += valueToString(child);
  }
  return held;
}

}  // namespace

void paint(M5Canvas& into, const Value& drawing) {
  if (drawing.kind() == Kind::Array) {
    for (const Value& one : *drawing.array()) {
      paint(into, one);
    }
    return;
  }
  if (drawing.kind() != Kind::Element) {
    return;
  }
  const Drawing& of = *drawing.drawing();
  const Object& props = *of.props;
  const int x = static_cast<int>(number(props, "x", 0));
  const int y = static_cast<int>(number(props, "y", 0));
  const uint16_t paintWith = colour(into, props);
  const bool fill = flag(props, "fill", true);

  if (of.id == "string") {
    into.setTextSize(static_cast<float>(number(props, "size", 1)));
    into.setTextColor(paintWith);
    into.setTextDatum(datumOf(text(props, "datum", "top-left")));
    into.drawString(saying(of).c_str(), x, y);
  } else if (of.id == "rect") {
    const int width = static_cast<int>(number(props, "width", 0));
    const int height = static_cast<int>(number(props, "height", 0));
    const int radius = static_cast<int>(number(props, "radius", 0));
    if (radius > 0) {
      if (fill) into.fillRoundRect(x, y, width, height, radius, paintWith);
      else into.drawRoundRect(x, y, width, height, radius, paintWith);
    } else {
      if (fill) into.fillRect(x, y, width, height, paintWith);
      else into.drawRect(x, y, width, height, paintWith);
    }
  } else if (of.id == "circle") {
    const int radius = static_cast<int>(number(props, "radius", 0));
    if (fill) into.fillCircle(x, y, radius, paintWith);
    else into.drawCircle(x, y, radius, paintWith);
  } else if (of.id == "ellipse") {
    const int width = static_cast<int>(number(props, "width", 0));
    const int height = static_cast<int>(number(props, "height", 0));
    if (fill) into.fillEllipse(x, y, width, height, paintWith);
    else into.drawEllipse(x, y, width, height, paintWith);
  } else if (of.id == "line") {
    into.drawLine(x, y, static_cast<int>(number(props, "toX", 0)),
                  static_cast<int>(number(props, "toY", 0)), paintWith);
  } else if (of.id == "triangle") {
    const int x2 = static_cast<int>(number(props, "x2", 0));
    const int y2 = static_cast<int>(number(props, "y2", 0));
    const int x3 = static_cast<int>(number(props, "x3", 0));
    const int y3 = static_cast<int>(number(props, "y3", 0));
    if (fill) into.fillTriangle(x, y, x2, y2, x3, y3, paintWith);
    else into.drawTriangle(x, y, x2, y2, x3, y3, paintWith);
  } else if (of.id == "pixel") {
    into.drawPixel(x, y, paintWith);
  } else if (of.id == "arc") {
    const int radius = static_cast<int>(number(props, "radius", 0));
    const int inner = static_cast<int>(number(props, "innerRadius", 0));
    const float start = static_cast<float>(number(props, "start", 0));
    const float end = static_cast<float>(number(props, "end", 360));
    if (fill) into.fillArc(x, y, radius, inner, start, end, paintWith);
    else into.drawArc(x, y, radius, inner, start, end, paintWith);
  }

  // Whatever it holds is drawn after it, so a child stands in front. A tag
  // this client does not know draws nothing and still draws what it holds,
  // which is what lets a fragment group things.
  for (const Value& child : of.children) {
    if (child.kind() == Kind::Element || child.kind() == Kind::Array) {
      paint(into, child);
    }
  }
}

}  // namespace backtick
