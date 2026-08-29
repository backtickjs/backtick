import { schema as web } from "@backtickjs/web-schema/schema";
import type { Schema } from "@backtickjs/schema";

/**
 * What this site's own client answers for, beside what the web does.
 *
 * Nothing yet. What goes here is a name this target can answer and the web
 * cannot — `builtinsOf` is where one arrives, and adding is a target's to do.
 */
export const schema: Schema = {
  package: "@backtickjs.com/schema",

  namespace: "Site",

  extends: [web],

  publishes: [],

  types: {},

  elements: {},

  builtins: {},
};
