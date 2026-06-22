import type {
  Client,
  Metadata,
  Spliceable,
  Visitor,
} from "@backtick/core/cs-runtime";

export default class StringifyVisitor implements Visitor<string> {
  lift(loc: null, expression: Spliceable): string {
    if (expression == null) {
      return this.null(loc);
    }
    if (typeof expression === "number") {
      return this.number(loc, expression);
    }
    if (typeof expression === "boolean") {
      return this.boolean(loc, expression);
    }
    if (typeof expression === "string") {
      return this.string(loc, expression);
    }
    if ("$$type" in expression && "visit" in expression) {
      return (expression as Client<unknown>).visit(this);
    }
    if (Array.isArray(expression)) {
      const elements = expression.map((item) => this.lift(loc, expression));
      return this.array(loc, elements);
    }
    const entries = Object.fromEntries(
      Object.entries(expression).map(([key, value]) => [
        key,
        this.lift(loc, value),
      ]),
    );
    return this.object(loc, entries);
  }

  backtick(_loc: null, _metadata: Metadata, expression: string): string {
    return "cs`" + expression + "`";
  }

  splice(loc: null, _key: string, expression: Spliceable): string {
    return "${" + this.lift(loc, expression) + "}";
  }

  null(_loc: null): string {
    return "null";
  }

  number(_loc: null, value: number): string {
    return value.toString();
  }

  boolean(_loc: null, value: boolean): string {
    return value ? "true" : "false";
  }

  string(_loc: null, value: string): string {
    return '"' + value + '"';
  }

  identifier(_loc: null, name: string): string {
    return name;
  }

  block(_loc: null, statements: string[]): string {
    return "{\n" + statements.map((line) => "  " + line).join("\n") + "\n}";
  }

  assignment(_loc: null, name: string, expression: string): string {
    return `${name} = ${expression};`;
  }

  return(_loc: null, expression: string): string {
    return `return ${expression};`;
  }

  propertyAccess(_loc: null, expression: string, name: string): string {
    return `${expression}.${name}`;
  }

  array(_loc: null, elements: string[]): string {
    return "[" + elements.join(", ") + "]";
  }

  object(_loc: null, entries: { [key: string]: string }): string {
    const parts = Object.entries(entries).map(
      ([key, value]) => key + ": " + value,
    );
    return "{" + parts.join(", ") + "}";
  }
}
