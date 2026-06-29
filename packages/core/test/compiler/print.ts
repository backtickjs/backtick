import type {
  Client,
  Metadata,
  SourceLocation,
  Spliceable,
  Visitor,
} from "@backtick/core/cs-runtime";

export function print(script: Client<unknown>): void {
  process.stdout.write(script.visit(new StringifyVisitor()));
}

class StringifyVisitor implements Visitor<string> {
  lift(loc: SourceLocation, expression: Spliceable): string {
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
      const elements = expression.map((item) => this.lift(loc, item));
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

  clientScript(
    _loc: SourceLocation,
    _metadata: Metadata,
    expression: string,
  ): string {
    return `cs\`${expression}\``;
  }

  splice(loc: SourceLocation, _key: string, expression: Spliceable): string {
    return `\${${this.lift(loc, expression)}}`;
  }

  null(_loc: SourceLocation): string {
    return "null";
  }

  number(_loc: SourceLocation, value: number): string {
    return value.toString();
  }

  boolean(_loc: SourceLocation, value: boolean): string {
    return value ? "true" : "false";
  }

  string(_loc: SourceLocation, value: string): string {
    return `"${value}"`;
  }

  identifier(_loc: SourceLocation, name: string): string {
    return name;
  }

  block(_loc: SourceLocation, statements: string[]): string {
    return `{\n${statements.map((line) => `  ${line}`).join("\n")}\n}`;
  }

  assignment(_loc: SourceLocation, name: string, expression: string): string {
    return `${name} = ${expression};`;
  }

  if(
    _loc: SourceLocation,
    condition: string,
    consequent: string,
    alternate: string | null,
  ): string {
    if (alternate != null) {
      return `if (${condition}) ${consequent} else ${alternate}`;
    } else {
      return `if (${condition}) ${consequent}`;
    }
  }

  return(_loc: SourceLocation, expression: string): string {
    return `return ${expression};`;
  }

  propertyAccess(
    _loc: SourceLocation,
    expression: string,
    name: string,
  ): string {
    return `${expression}.${name}`;
  }

  binop(
    _loc: SourceLocation,
    lhs: string,
    operator: string,
    rhs: string,
  ): string {
    return `${lhs} ${operator} ${rhs}`;
  }

  array(_loc: SourceLocation, elements: string[]): string {
    return `[${elements.join(", ")}]`;
  }

  object(_loc: SourceLocation, entries: { [key: string]: string }): string {
    const parts = Object.entries(entries).map(
      ([key, value]) => `${key}: ${value}`,
    );
    return `({${parts.join(", ")}})`;
  }
}
