#pragma once

#include <memory>
#include <string>
#include <unordered_map>
#include <vector>

#include "Json.h"
#include "Value.h"

namespace backtick {

// The bundle's node kinds. Numbers, not names, on the wire — and never
// reordered, because a renumbered kind misreads every bundle already written.
namespace NodeKind {
constexpr int Element = 0;
constexpr int GetFunction = 1;
constexpr int ApplyFunction = 2;
constexpr int Builtin = 3;
constexpr int DataArray = 4;
constexpr int Identifier = 1000;
constexpr int CallExpression = 1001;
constexpr int PropertyAccessExpression = 1002;
constexpr int BinaryExpression = 1003;
constexpr int ConditionalExpression = 1004;
constexpr int ArrowFunction = 1005;
constexpr int Block = 1006;
constexpr int VariableDeclaration = 1007;
constexpr int IfStatement = 1008;
constexpr int ReturnStatement = 1009;
constexpr int ThrowStatement = 1010;
constexpr int TryStatement = 1011;
constexpr int WhileStatement = 1012;
constexpr int ForStatement = 1013;
constexpr int BreakStatement = 1014;
constexpr int ContinueStatement = 1015;
constexpr int ElementAccessExpression = 1016;
constexpr int CatchClause = 1017;
constexpr int Parameter = 1018;
constexpr int PrefixUnaryExpression = 1019;
constexpr int SpreadElement = 1020;
constexpr int ObjectLiteralExpression = 1021;
}  // namespace NodeKind

// A binding is a name and what it holds. A scope is a frame and the one that
// held it — lexical, and shallow in practice, because names arrive resolved
// and a body binds few.
struct Scope {
  std::shared_ptr<Scope> outer;
  std::unordered_map<std::string, Value> bindings;

  Value* find(const std::string& name);
};

// A function value: an arrow's parameters and body, and the scope it was
// written in. A native is the other kind — a name the client answers for
// rather than a body the bundle carries.
struct Closure {
  const JsonValue* parameters = nullptr;
  const JsonValue* body = nullptr;
  std::shared_ptr<Scope> scope;
  Native native;
  std::string name;
  // A `for`, which is not a drawing but the promise of a run of them. Held
  // rather than expanded where it is written, because what expands it is a
  // parent taking its children — at the root there is no parent, and what
  // stands there is this, undrawn.
  bool expandsInPlace = false;
};

// What a bundle threw, carried out to whoever asked for the value. A thrown
// value is an ordinary value — the language has no error type of its own.
struct Thrown {
  Value value;
};

// What a statement did. `Normal` is the common case and costs nothing to say;
// the rest unwind to whatever is watching for them.
enum class Flow : unsigned char { Normal, Return, Break, Continue };

struct Completion {
  Flow flow = Flow::Normal;
  Value value;
};

class Interpreter {
 public:
  // The names the client answers for, by the whole name the schema writes —
  // `Math.floor`, not a `Math` holding a `floor`.
  std::unordered_map<std::string, Value> builtins;

  // Storage, kept across evaluations.
  //
  // A drawing is made by running the bundle again, so `state` must hand back
  // the cell it handed back last time or nothing would ever hold. What
  // identifies one is where it was made: evaluation is deterministic and the
  // format says so, which makes the Nth `state` of one run the Nth of the
  // next. `restart` puts the cursor back before a run.
  std::vector<std::shared_ptr<struct Cell>> cells;
  size_t nextCell = 0;

  // Bumped whenever a cell is written. What a loop watches to know a drawing
  // is out of date — cheaper than asking what changed, and enough when the
  // answer is always "draw it again".
  unsigned long generation = 0;

  void restart() { nextCell = 0; }

  // Evaluates `root` against the `functions` table. Throws `Thrown` for what
  // the bundle threw and `std::runtime_error` for what it could not mean.
  Value run(const Json& json);

  Value call(const Value& callee, std::vector<Value>& args);

  // What a `for` hands its children beside the member: where it sits, as
  // storage rather than a number. Supplied by whoever installed `state`, so
  // one kind of cell serves both.
  std::function<Value(size_t)> position = [](size_t at) {
    return Value::number(static_cast<double>(at));
  };

  void flatten(const Value& of, std::vector<Value>& into);

 private:
  Value evaluate(const JsonValue& node, const std::shared_ptr<Scope>& scope);
  Completion execute(const JsonValue& node, const std::shared_ptr<Scope>& scope);
  Completion block(const JsonValue& statements, const std::shared_ptr<Scope>& scope);
  Value data(const JsonValue& node);
  Value binary(const std::string& op, const JsonValue& node,
               const std::shared_ptr<Scope>& scope);
  Value member(const Value& of, const std::string& name);
  void spread(const JsonValue& members, const std::shared_ptr<Scope>& scope,
              std::vector<Value>& into);
  const JsonValue& entry(const std::string& label);

  const Json* json_ = nullptr;
  const JsonValue* functions_ = nullptr;
};

// A number as JavaScript writes one, which is what a `.value` snapshot holds:
// an integer prints without a point, and the rest print shortest-round-trip.
std::string numberToString(double of);

// A value where text is wanted: what `+` writes beside a string, and what a
// member joining an array writes for each.
std::string valueToString(const Value& of);

}  // namespace backtick
