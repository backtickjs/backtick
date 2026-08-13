import type { TProperties, TSchema, TSchemaOptions } from "typebox";
import type { SchemaNode } from "../Schema.js";

export interface TInterface<
  Heritage extends readonly SchemaNode[] = readonly SchemaNode[],
  Properties extends TProperties = TProperties,
> extends TSchema {
  readonly type: "interface";
  readonly extends: Heritage;
  readonly properties: Properties;
  readonly required: readonly string[];
}

export function Interface<
  Heritage extends readonly SchemaNode[],
  Properties extends TProperties,
>(
  heritage: [...Heritage],
  properties: Properties,
  options: TSchemaOptions = {},
): TInterface<Heritage, Properties> {
  const required = Object.entries(properties)
    .filter(([, node]) => !("~optional" in node))
    .map(([name]) => name);
  return {
    ...options,
    type: "interface",
    extends: heritage,
    properties,
    required,
  };
}

export function IsInterface(value: unknown): value is TInterface {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value["type"] === "interface"
  );
}
