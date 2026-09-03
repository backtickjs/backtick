#pragma once

#include <string_view>

namespace backtick {

// What a node is, as position 0 carries it; never respelled.
namespace NodeKind {
inline constexpr std::string_view Element                          = "el";
inline constexpr std::string_view GetFunction                      = "fn";
inline constexpr std::string_view ApplyFunction                    = "fn()";
inline constexpr std::string_view Builtin                          = "bltn";
inline constexpr std::string_view Identifier                       = "id";
inline constexpr std::string_view CallExpression                   = "()";
inline constexpr std::string_view OptionalCallExpression           = "?.()";
inline constexpr std::string_view PropertyAccessExpression         = ".";
inline constexpr std::string_view OptionalPropertyAccessExpression = "?.";
inline constexpr std::string_view Assignment                       = "=";
inline constexpr std::string_view LogicalAnd                       = "&&";
inline constexpr std::string_view LogicalOr                        = "||";
inline constexpr std::string_view NullishCoalescing                = "??";
inline constexpr std::string_view Addition                         = "+";
inline constexpr std::string_view Subtraction                      = "-";
inline constexpr std::string_view Multiplication                   = "*";
inline constexpr std::string_view Division                         = "/";
inline constexpr std::string_view Remainder                        = "%";
inline constexpr std::string_view StrictEquality                   = "===";
inline constexpr std::string_view StrictInequality                 = "!==";
inline constexpr std::string_view LessThan                         = "<";
inline constexpr std::string_view LessThanOrEqual                  = "<=";
inline constexpr std::string_view GreaterThan                      = ">";
inline constexpr std::string_view GreaterThanOrEqual               = ">=";
inline constexpr std::string_view ConditionalExpression            = "?:";
inline constexpr std::string_view ArrowFunction                    = "=>";
inline constexpr std::string_view Block                            = "{}";
inline constexpr std::string_view ConstDeclaration                 = "const";
inline constexpr std::string_view LetDeclaration                   = "let";
inline constexpr std::string_view IfStatement                      = "if";
inline constexpr std::string_view ReturnStatement                  = "return";
inline constexpr std::string_view ThrowStatement                   = "throw";
inline constexpr std::string_view TryStatement                     = "try";
inline constexpr std::string_view WhileStatement                   = "while";
inline constexpr std::string_view ForStatement                     = "for";
inline constexpr std::string_view BreakStatement                   = "break";
inline constexpr std::string_view ContinueStatement                = "continue";
inline constexpr std::string_view ElementAccessExpression          = "[]";
inline constexpr std::string_view CatchClause                      = "catch";
inline constexpr std::string_view Parameter                        = "param";
inline constexpr std::string_view LogicalNot                       = "!";
inline constexpr std::string_view Negation                         = "-x";
inline constexpr std::string_view SpreadElement                    = "...";
inline constexpr std::string_view ObjectLiteralExpression          = "obj";
inline constexpr std::string_view PropertyAssignment               = ":";
inline constexpr std::string_view ArrayLiteralExpression           = "arr";
}  // namespace NodeKind

}  // namespace backtick
