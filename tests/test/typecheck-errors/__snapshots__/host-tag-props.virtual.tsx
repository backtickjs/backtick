import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";

// A host tag is checked as a call, and each of its errors is reported where the
// JSX that made it is written: a prop's under the prop, a missing one and an
// unknown one under the tag, a child's over the children.
const Card = cs.lift((() => (__cs_props: { title: string; children?: unknown }) => (
  <section>{__cs_props.title}</section>
))());

// @ts-expect-error: Property 'title' is missing.
export const missing = cs.lift((() => (void <cs.tag />, cs.splice((Card))({ })))());

// @ts-expect-error: Type 'number' is not assignable to type 'string'.
export const wrong = cs.lift((() => (void <cs.tag />, cs.splice((Card))({ title: 1, })))());

// @ts-expect-error: Object literal may only specify known properties.
export const unknown = cs.lift((() => (void <cs.tag />, cs.splice((Card))({ title: "x", nope: 1, })))());

// @ts-expect-error: the child reads each item as a string, not a number.
export const wrongChild = cs.lift((() => (void <cs.tag>{(For)}</cs.tag>, cs.splice((For))({ each: [1], children: (__cs_n: string) => __cs_n })))());

// @ts-expect-error: Solid's JSX takes no `key`, so neither does a host tag.
export const keyed = cs.lift((() => (void <cs.tag key={"a"} />, cs.splice((Card))({ title: "x", })))());
