#include "Interpreter.h"

#include <cmath>
#include <cstdio>
#include <stdexcept>

namespace backtick {

Value* Scope::find(const std::string& name) {
  for (Scope* at = this; at != nullptr; at = at->outer.get()) {
    auto held = at->bindings.find(name);
    if (held != at->bindings.end()) {
      return &held->second;
    }
  }
  return nullptr;
}

std::string numberToString(double of) {
  if (std::isnan(of)) return "NaN";
  if (std::isinf(of)) return of > 0 ? "Infinity" : "-Infinity";
  if (of == 0) return std::signbit(of) ? "0" : "0";
  // An integer prints as one: `1`, never `1.0`. The range is where a double
  // still holds every integer, past which JavaScript itself goes exponential.
  if (of == std::floor(of) && std::fabs(of) < 1e21) {
    char held[32];
    std::snprintf(held, sizeof(held), "%.0f", of);
    return held;
  }
  // Shortest representation that reads back as the same double, which is what
  // JavaScript prints and so what a snapshot holds.
  for (int digits = 1; digits <= 17; digits++) {
    char held[40];
    std::snprintf(held, sizeof(held), "%.*g", digits, of);
    if (std::strtod(held, nullptr) == of) {
      return held;
    }
  }
  char held[40];
  std::snprintf(held, sizeof(held), "%.17g", of);
  return held;
}

std::string valueToString(const Value& of) {
  switch (of.kind()) {
    case Kind::String: return of.string();
    case Kind::Number: return numberToString(of.number());
    case Kind::Boolean: return of.boolean() ? "true" : "false";
    case Kind::Null: return "null";
    default: return "";
  }
}

static bool isNode(const Json& json, const JsonValue& of) {
  // An array in an expression slot is always a node — which is why a literal
  // array is wrapped in `DataArray`. Everything else carries itself.
  return of.kind == JsonKind::Array;
}

static int kindOf(const Json& json, const JsonValue& node) {
  const JsonValue& head = json.item(node, 0);
  return static_cast<int>(head.number);
}

Value Interpreter::data(const JsonValue& node) {
  const Json& json = *json_;
  switch (node.kind) {
    case JsonKind::Null:
      return Value::null();
    case JsonKind::True:
      return Value::boolean(true);
    case JsonKind::False:
      return Value::boolean(false);
    case JsonKind::Number:
      return Value::number(node.number);
    case JsonKind::String:
      return Value::string(std::string(json.text(node)));
    default:
      throw std::runtime_error("this is not a literal");
  }
}

const JsonValue& Interpreter::entry(const std::string& label) {
  const Json& json = *json_;
  for (unsigned int i = 0; i < functions_->count; i++) {
    if (json.key(*functions_, i) == label) {
      return json.item(*functions_, i);
    }
  }
  throw std::runtime_error("no function `" + label + "` in this bundle");
}

void Interpreter::spread(const JsonValue& members,
                         const std::shared_ptr<Scope>& scope,
                         std::vector<Value>& into) {
  const Json& json = *json_;
  for (unsigned int i = 0; i < members.count; i++) {
    const JsonValue& held = json.item(members, i);
    if (isNode(json, held) && held.count > 0 &&
        kindOf(json, held) == NodeKind::SpreadElement) {
      Value of = evaluate(json.item(held, 1), scope);
      if (of.kind() == Kind::Array) {
        for (const Value& one : *of.array()) {
          into.push_back(one);
        }
      }
      continue;
    }
    into.push_back(evaluate(held, scope));
  }
}

Value Interpreter::member(const Value& of, const std::string& name) {
  switch (of.kind()) {
    case Kind::Record: {
      const Value* held = of.record()->find(name);
      // Reading an absent property yields `null`, which the format guarantees
      // in place of `undefined`.
      return held == nullptr ? Value::null() : *held;
    }
    case Kind::Array:
      if (name == "length") {
        return Value::number(static_cast<double>(of.array()->size()));
      }
      break;
    case Kind::String:
      if (name == "length") {
        return Value::number(static_cast<double>(of.string().size()));
      }
      break;
    default:
      break;
  }
  // A member of a value the client answers for — `string.charAt`, and the rest
  // of the language's table — is looked up under its whole name, bound to the
  // receiver at the call site.
  return Value::null();
}

Value Interpreter::binary(const std::string& op, const JsonValue& node,
                          const std::shared_ptr<Scope>& scope) {
  const Json& json = *json_;
  const JsonValue& leftNode = json.item(node, 2);
  const JsonValue& rightNode = json.item(node, 3);

  // The three that do not evaluate both sides.
  if (op == "&&") {
    Value left = evaluate(leftNode, scope);
    return left.boolean() ? evaluate(rightNode, scope) : left;
  }
  if (op == "||") {
    Value left = evaluate(leftNode, scope);
    return left.boolean() ? left : evaluate(rightNode, scope);
  }
  if (op == "??") {
    Value left = evaluate(leftNode, scope);
    return left.isNull() ? evaluate(rightNode, scope) : left;
  }
  if (op == "=") {
    Value right = evaluate(rightNode, scope);
    if (isNode(json, leftNode) && kindOf(json, leftNode) == NodeKind::Identifier) {
      std::string name(json.text(json.item(leftNode, 1)));
      Value* held = scope->find(name);
      if (held == nullptr) {
        throw std::runtime_error("assigning to unbound `" + name + "`");
      }
      *held = right;
      return right;
    }
    throw std::runtime_error("assigning to something that is not a name");
  }

  Value left = evaluate(leftNode, scope);
  Value right = evaluate(rightNode, scope);

  if (op == "===") return Value::boolean(left.same(right));
  if (op == "!==") return Value::boolean(!left.same(right));

  if (op == "+") {
    // `+` is arithmetic or concatenation, decided by the operands — and the
    // compiler has already refused the mixed case, so this never coerces.
    if (left.kind() == Kind::String || right.kind() == Kind::String) {
      return Value::string(valueToString(left) + valueToString(right));
    }
    return Value::number(left.number() + right.number());
  }
  if (op == "-") return Value::number(left.number() - right.number());
  if (op == "*") return Value::number(left.number() * right.number());
  if (op == "/") return Value::number(left.number() / right.number());
  if (op == "%") return Value::number(std::fmod(left.number(), right.number()));

  const bool text = left.kind() == Kind::String && right.kind() == Kind::String;
  if (op == "<") return Value::boolean(text ? left.string() < right.string() : left.number() < right.number());
  if (op == "<=") return Value::boolean(text ? left.string() <= right.string() : left.number() <= right.number());
  if (op == ">") return Value::boolean(text ? left.string() > right.string() : left.number() > right.number());
  if (op == ">=") return Value::boolean(text ? left.string() >= right.string() : left.number() >= right.number());

  throw std::runtime_error("unknown operator `" + op + "`");
}

Value Interpreter::call(const Value& callee, std::vector<Value>& args) {
  if (callee.kind() != Kind::Function) {
    throw std::runtime_error("calling something that is not a function");
  }
  const Closure& held = *callee.function();
  if (held.native) {
    return held.native(args);
  }
  auto inner = std::make_shared<Scope>();
  inner->outer = held.scope;
  const Json& json = *json_;
  for (unsigned int i = 0; i < held.parameters->count; i++) {
    const JsonValue& parameter = json.item(*held.parameters, i);
    std::string name(json.text(json.item(parameter, 1)));
    // A missing argument binds `null`; parameters are otherwise required.
    inner->bindings[name] = i < args.size() ? args[i] : Value::null();
  }
  // A body is a block or an expression, and an expression body returns itself.
  if (isNode(json, *held.body) && held.body->count > 0 &&
      kindOf(json, *held.body) == NodeKind::Block) {
    Completion done = block(json.item(*held.body, 1), inner);
    // An arrow that completes without `return` completes with `null`.
    return done.flow == Flow::Return ? done.value : Value::null();
  }
  return evaluate(*held.body, inner);
}

Completion Interpreter::block(const JsonValue& statements,
                              const std::shared_ptr<Scope>& scope) {
  const Json& json = *json_;
  auto inner = std::make_shared<Scope>();
  inner->outer = scope;
  for (unsigned int i = 0; i < statements.count; i++) {
    Completion done = execute(json.item(statements, i), inner);
    if (done.flow != Flow::Normal) {
      return done;
    }
  }
  return {};
}

Completion Interpreter::execute(const JsonValue& node,
                                const std::shared_ptr<Scope>& scope) {
  const Json& json = *json_;
  if (!isNode(json, node) || node.count == 0) {
    evaluate(node, scope);
    return {};
  }
  switch (kindOf(json, node)) {
    case NodeKind::Block:
      return block(json.item(node, 1), scope);

    case NodeKind::VariableDeclaration: {
      std::string name(json.text(json.item(node, 1)));
      scope->bindings[name] = evaluate(json.item(node, 2), scope);
      return {};
    }

    case NodeKind::IfStatement: {
      if (evaluate(json.item(node, 1), scope).boolean()) {
        return execute(json.item(node, 2), scope);
      }
      const JsonValue& otherwise = json.item(node, 3);
      if (otherwise.kind != JsonKind::Null) {
        return execute(otherwise, scope);
      }
      return {};
    }

    case NodeKind::WhileStatement: {
      while (evaluate(json.item(node, 1), scope).boolean()) {
        Completion done = execute(json.item(node, 2), scope);
        if (done.flow == Flow::Break) break;
        if (done.flow == Flow::Return) return done;
      }
      return {};
    }

    case NodeKind::ForStatement: {
      auto turn = std::make_shared<Scope>();
      turn->outer = scope;
      const JsonValue& start = json.item(node, 1);
      if (start.kind != JsonKind::Null) {
        execute(start, turn);
      }
      while (true) {
        const JsonValue& test = json.item(node, 2);
        if (test.kind != JsonKind::Null && !evaluate(test, turn).boolean()) {
          break;
        }
        Completion done = execute(json.item(node, 4), turn);
        if (done.flow == Flow::Break) break;
        if (done.flow == Flow::Return) return done;
        // A binding per turn, not one for the loop: an arrow made in the body
        // captures the value this turn had, and the next turn moves on without
        // it. Copied before the incrementor runs, so what was captured is what
        // the body saw.
        auto next = std::make_shared<Scope>();
        next->outer = scope;
        next->bindings = turn->bindings;
        turn = next;
        const JsonValue& step = json.item(node, 3);
        if (step.kind != JsonKind::Null) {
          execute(step, turn);
        }
      }
      return {};
    }

    case NodeKind::ReturnStatement: {
      Completion done;
      done.flow = Flow::Return;
      done.value = evaluate(json.item(node, 1), scope);
      return done;
    }

    case NodeKind::BreakStatement:
      return {Flow::Break, Value::null()};

    case NodeKind::ContinueStatement:
      return {Flow::Continue, Value::null()};

    case NodeKind::ThrowStatement:
      throw Thrown{evaluate(json.item(node, 1), scope)};

    case NodeKind::TryStatement: {
      const JsonValue& caught = json.item(node, 2);
      try {
        return execute(json.item(node, 1), scope);
      } catch (Thrown& thrown) {
        auto inner = std::make_shared<Scope>();
        inner->outer = scope;
        const JsonValue& name = json.item(caught, 1);
        // A catch may bind nothing — `catch { … }` — and then what was thrown
        // is not reachable, which is a thing the language lets you say.
        if (name.kind == JsonKind::String) {
          inner->bindings[std::string(json.text(name))] = thrown.value;
        }
        return execute(json.item(caught, 2), inner);
      }
    }

    default:
      evaluate(node, scope);
      return {};
  }
}

Value Interpreter::evaluate(const JsonValue& node,
                            const std::shared_ptr<Scope>& scope) {
  const Json& json = *json_;
  if (node.kind == JsonKind::Object) {
    // A record written out, whose members are expressions like any other slot.
    // `ObjectLiteralExpression` is the form for one holding a spread; this is
    // the plain one, and JSON carries it as itself.
    auto held = std::make_shared<Object>();
    for (unsigned int i = 0; i < node.count; i++) {
      held->set(std::string(json.key(node, i)),
                evaluate(json.item(node, i), scope));
    }
    return Value::record(held);
  }
  if (!isNode(json, node)) {
    return data(node);
  }
  if (node.count == 0) {
    throw std::runtime_error("an empty array is not a node");
  }
  switch (kindOf(json, node)) {
    case NodeKind::Identifier: {
      std::string name(json.text(json.item(node, 1)));
      Value* held = scope->find(name);
      if (held != nullptr) {
        return *held;
      }
      auto builtin = builtins.find(name);
      if (builtin != builtins.end()) {
        return builtin->second;
      }
      throw std::runtime_error("`" + name + "` is not bound");
    }

    case NodeKind::Undefined:
      return Value::undefined();

    case NodeKind::Builtin: {
      std::string name(json.text(json.item(node, 1)));
      auto held = builtins.find(name);
      if (held == builtins.end()) {
        throw std::runtime_error("this client does not answer for `" + name + "`");
      }
      return held->second;
    }

    case NodeKind::DataArray: {
      auto held = std::make_shared<Array>();
      spread(json.item(node, 1), scope, *held);
      return Value::array(held);
    }

    case NodeKind::ObjectLiteralExpression: {
      auto held = std::make_shared<Object>();
      const JsonValue& entries = json.item(node, 1);
      for (unsigned int i = 0; i < entries.count; i++) {
        const JsonValue& pair = json.item(entries, i);
        const JsonValue& name = json.item(pair, 0);
        Value value = evaluate(json.item(pair, 1), scope);
        if (name.kind == JsonKind::Null) {
          // A spread: its members join this one, in order.
          if (value.kind() == Kind::Record) {
            const Object& from = *value.record();
            for (size_t at = 0; at < from.keys.size(); at++) {
              held->set(from.keys[at], from.values[at]);
            }
          }
          continue;
        }
        held->set(std::string(json.text(name)), value);
      }
      return Value::record(held);
    }

    case NodeKind::ArrowFunction: {
      auto held = std::make_shared<Closure>();
      held->parameters = &json.item(node, 1);
      held->body = &json.item(node, 2);
      held->scope = scope;
      return Value::function(held);
    }

    case NodeKind::FunctionReference: {
      std::string label(json.text(json.item(node, 1)));
      const JsonValue& arrow = entry(label);
      auto held = std::make_shared<Closure>();
      held->parameters = &json.item(arrow, 1);
      held->body = &json.item(arrow, 2);
      // An entry closes over nothing: its shape is a function of its source,
      // and everything it needs arrives as an argument.
      held->scope = nullptr;
      return Value::function(held);
    }

    case NodeKind::CallExpression: {
      const JsonValue& target = json.item(node, 1);
      const bool optional = json.item(node, 2).kind == JsonKind::True;
      // A member call binds its receiver: `s.charAt(i)` is the client's
      // `string.charAt` handed `s` first, which is how the schema writes it.
      if (isNode(json, target) && target.count > 0 &&
          kindOf(json, target) == NodeKind::PropertyAccessExpression) {
        Value receiver = evaluate(json.item(target, 1), scope);
        if (json.item(target, 2).kind == JsonKind::True && receiver.isNull()) {
          return Value::null();
        }
        std::string name(json.text(json.item(target, 3)));
        Value callee = member(receiver, name);
        // A function the value itself holds — a cell's `write`, a record's own
        // member — takes what the call site wrote and nothing else. Only a
        // name the client answers for takes the receiver first, because that
        // is how the schema declares one: `string.charAt(self, pos)`.
        bool receives = false;
        if (callee.kind() != Kind::Function) {
          receives = true;
          const char* prefix = nullptr;
          switch (receiver.kind()) {
            case Kind::String: prefix = "string."; break;
            case Kind::Number: prefix = "number."; break;
            case Kind::Boolean: prefix = "boolean."; break;
            case Kind::Array: prefix = "array."; break;
            default: break;
          }
          if (prefix != nullptr) {
            auto held = builtins.find(std::string(prefix) + name);
            if (held != builtins.end()) {
              callee = held->second;
            }
          }
        }
        if (optional && callee.isNull()) {
          return Value::null();
        }
        std::vector<Value> args;
        if (receives) {
          args.push_back(receiver);
        }
        spread(json.item(node, 3), scope, args);
        return call(callee, args);
      }
      Value callee = evaluate(target, scope);
      if (optional && callee.isNull()) {
        return Value::null();
      }
      std::vector<Value> args;
      spread(json.item(node, 3), scope, args);
      return call(callee, args);
    }

    case NodeKind::PropertyAccessExpression: {
      Value of = evaluate(json.item(node, 1), scope);
      if (json.item(node, 2).kind == JsonKind::True && of.isNull()) {
        return Value::null();
      }
      return member(of, std::string(json.text(json.item(node, 3))));
    }

    case NodeKind::ElementAccessExpression: {
      Value of = evaluate(json.item(node, 1), scope);
      Value key = evaluate(json.item(node, 2), scope);
      if (of.kind() == Kind::Array && key.kind() == Kind::Number) {
        const Array& held = *of.array();
        double at = key.number();
        if (at < 0 || at >= static_cast<double>(held.size()) ||
            at != std::floor(at)) {
          return Value::null();
        }
        return held[static_cast<size_t>(at)];
      }
      if (of.kind() == Kind::String && key.kind() == Kind::Number) {
        const std::string& held = of.string();
        double at = key.number();
        if (at < 0 || at >= static_cast<double>(held.size())) {
          return Value::null();
        }
        return Value::string(std::string(1, held[static_cast<size_t>(at)]));
      }
      if (of.kind() == Kind::Record && key.kind() == Kind::String) {
        return member(of, key.string());
      }
      return Value::null();
    }

    case NodeKind::BinaryExpression:
      return binary(std::string(json.text(json.item(node, 1))), node, scope);

    case NodeKind::PrefixUnaryExpression: {
      std::string op(json.text(json.item(node, 1)));
      Value of = evaluate(json.item(node, 2), scope);
      if (op == "!") return Value::boolean(!of.boolean());
      if (op == "-") return Value::number(-of.number());
      throw std::runtime_error("unknown prefix `" + op + "`");
    }

    case NodeKind::ConditionalExpression:
      return evaluate(json.item(node, 1), scope).boolean()
                 ? evaluate(json.item(node, 2), scope)
                 : evaluate(json.item(node, 3), scope);

    case NodeKind::Block:
    case NodeKind::IfStatement:
    case NodeKind::WhileStatement:
    case NodeKind::ForStatement:
    case NodeKind::ReturnStatement:
    case NodeKind::ThrowStatement:
    case NodeKind::TryStatement:
    case NodeKind::VariableDeclaration:
    case NodeKind::BreakStatement:
    case NodeKind::ContinueStatement: {
      Completion done = execute(node, scope);
      return done.value;
    }

    case NodeKind::Element: {
      auto held = std::make_shared<Drawing>();
      held->id = std::string(json.text(json.item(node, 1)));
      held->props = std::make_shared<Object>();
      const JsonValue& props = json.item(node, 2);
      for (unsigned int i = 0; i < props.count; i++) {
        held->props->set(std::string(json.key(props, i)),
                         evaluate(json.item(props, i), scope));
      }
      // `for` is the one id the language names rather than a target: it draws
      // one thing per member of `each`, and its children slot is applied to
      // the member rather than drawn once. The position arrives as storage,
      // because a member moves without changing.
      if (held->id == "for") {
        // Not an element in the end: what it draws stands where it stood, so
        // it answers with the run of drawings rather than something holding
        // them. The children slot is a function, applied per member.
        const Value* each = held->props->find("each");
        Value make = evaluate(json.item(node, 3), scope);
        Value members = each == nullptr ? Value::null() : *each;
        auto run = std::make_shared<Closure>();
        run->expandsInPlace = true;
        run->name = "for";
        run->native = [this, members, make](std::vector<Value>&) {
          auto drawn = std::make_shared<Array>();
          if (members.kind() == Kind::Array && make.kind() == Kind::Function) {
            const Array& held = *members.array();
            for (size_t i = 0; i < held.size(); i++) {
              std::vector<Value> args{held[i], position(i)};
              drawn->push_back(call(make, args));
            }
          }
          return Value::array(drawn);
        };
        return Value::function(run);
      }
      flatten(evaluate(json.item(node, 3), scope), held->children);
      return Value::element(held);
    }

    default:
      throw std::runtime_error("unknown node kind " +
                               std::to_string(kindOf(json, node)));
  }
}

void Interpreter::flatten(const Value& of, std::vector<Value>& into) {
  // A children slot holds one thing, several, or nothing, and a list inside a
  // list is still one run. Flattened here so a renderer walks children and
  // never asks which shape they arrived in.
  if (of.isNull()) {
    return;
  }
  if (of.kind() == Kind::Array) {
    for (const Value& one : *of.array()) {
      flatten(one, into);
    }
    return;
  }
  // A `for` becomes what it draws exactly here, where a parent is taking its
  // children — which is the difference between one inside an element and one
  // standing at the root.
  if (of.kind() == Kind::Function && of.function()->expandsInPlace) {
    std::vector<Value> none;
    flatten(of.function()->native(none), into);
    return;
  }
  into.push_back(of);
}

Value Interpreter::run(const Json& json) {
  json_ = &json;
  const JsonValue& document = json.root();
  const JsonValue* root = nullptr;
  for (unsigned int i = 0; i < document.count; i++) {
    std::string_view name = json.key(document, i);
    if (name == "functions") {
      functions_ = &json.item(document, i);
    } else if (name == "root") {
      root = &json.item(document, i);
    }
  }
  if (functions_ == nullptr || root == nullptr) {
    throw std::runtime_error("a bundle is `functions` and `root`");
  }
  auto scope = std::make_shared<Scope>();
  return evaluate(*root, scope);
}

}  // namespace backtick
