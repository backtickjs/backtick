import {
  documentation,
  getter,
  interfaceLines,
  key,
  member,
  parameter,
  tags,
  type,
  typeParameter,
} from "./generators/typescript.js";

/**
 * Schema nodes as the host language writes them.
 *
 * The vocabulary the generators here write with, exported because a generator
 * that is not one of them still writes the same language: `platform-sdk`'s own
 * `receivers` script turns the flat builtins into the interfaces a typechecker
 * reads them through, and it lives there because only the language's own names
 * are read that way. A second printer beside this one would be a second
 * dialect of the same output.
 */
export const typescript = {
  documentation,
  getter,
  interfaceLines,
  key,
  member,
  parameter,
  tags,
  type,
  typeParameter,
};
